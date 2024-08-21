import { renderErrorToast } from "@/lib/helpers";
import { inDevEnvironment } from "@/lib/utils";
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
  clusterApiUrl,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import axios from "axios";
import bs58 from "bs58";

const BASE_URL = inDevEnvironment ? "http://localhost:3001" : "https://jetpack-web3-wallet-backend.onrender.com";

export async function sendSolanaToken(
  sender_private_key: string,
  receiver_public_key: string,
  amount: number
): Promise<string> {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const senderPrivateKey = bs58.decode(sender_private_key);
    const senderKeypair = Keypair.fromSecretKey(senderPrivateKey);
    const receiverPublicKey = new PublicKey(receiver_public_key);
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: senderKeypair.publicKey,
        toPubkey: receiverPublicKey,
        lamports: amount * 1000000000,
      })
    );
    const signature = await sendAndConfirmTransaction(connection, transaction, [
      senderKeypair,
    ]);
    return signature;
  } catch (error) {
    console.error("Transaction failed:", error);
    renderErrorToast("Transaction failed", error?.message);
  }
}

export async function requestAirdrop(receiver_public_key: string, amount:number) {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const publicKey = new PublicKey(receiver_public_key);
    const signature = await connection.requestAirdrop(
      publicKey,
      amount * LAMPORTS_PER_SOL
    );
    const latestBlockHash = await connection.getLatestBlockhash();
    await connection.confirmTransaction(
      {
        blockhash: latestBlockHash.blockhash,
        lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
        signature: signature,
      },
      "confirmed"
    );
  } catch (error) {
    console.error("Transaction failed:", error);
    renderErrorToast("Transaction failed", error?.message);
  }
}

export const getEthBalance = async (payload) => {
  try {
    let url = `${BASE_URL}/wallet/get-eth-balance`;

    const response = await axios.post(url, payload);
    return response;
  } catch (err) {
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
}

export const getSolanaBalance = async (payload) => {
  try {
    let url = `${BASE_URL}/wallet/get-sol-balance`;

    const response = await axios.post(url, payload);
    return response;
  } catch (err) {
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
}
