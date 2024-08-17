import { HDNode } from "@ethersproject/hdnode";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { derivation_path_eth, derivation_path_sol, NETWORK } from "./constants";
import nacl from "tweetnacl";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import { Wallet } from "@/model/Wallet";
import { encodeBase58, Wallet as EthWallet, HDNodeWallet } from "ethers";
import { JetPackWallet } from "@/model/JetPackWallet";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getMnemonicPhrase = () => {
  return generateMnemonic();
};

export const getEthereumWallet = (wallet_index: number, mnemonic: string) => {
  const derivation_path = `m/44'/501'/${wallet_index}'/0'`;
  const hd_node = HDNode.fromMnemonic(mnemonic).derivePath(derivation_path);

  const wallet = {
    network: "Ethereum",
    public_key: hd_node.address,
  };

  return wallet;
};

const getSolanaWallet = (wallet_index: number, mnemonic: string) => {
  const seed = mnemonicToSeedSync(mnemonic);
  const path = derivation_path_sol?.replace("x", `${wallet_index}`);
  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
  const keyPair = Keypair.fromSecretKey(secret);
  
  return new Wallet(wallet_index, keyPair.publicKey.toBase58(), NETWORK.SOLANA, keyPair.publicKey);
};

const getEthWallet = (wallet_index: number, mnemonic: string) => {
  const seed = mnemonicToSeedSync(mnemonic);
  const path = derivation_path_eth?.replace("x", `${wallet_index}`);
  const hdNode = HDNodeWallet.fromSeed(seed);
  const child = hdNode.derivePath(path);
  const privateKey = child.privateKey;
  const wallet = new EthWallet(privateKey);
    
  return new Wallet(wallet_index, wallet.address, NETWORK.ETHEREUM);
};

export const getWallet = (wallet_index: number, mnemonic: string) => {
  let sol_wallet = getSolanaWallet(wallet_index, mnemonic);
  let eth_wallet = getEthWallet(wallet_index, mnemonic);
  let new_jetpack_wallet = new JetPackWallet(
    `Account ${wallet_index + 1}`,
    sol_wallet,
    eth_wallet
  );
  return new_jetpack_wallet;
};

export const deriveSolanaPrivateKey = (wallet_index:string, mnemonic: string) => {
  const seed = mnemonicToSeedSync(mnemonic);
  const path = derivation_path_sol?.replace("x", `${wallet_index}`);
  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
  const keyPair = Keypair.fromSecretKey(secret);  
  return encodeBase58(keyPair.secretKey);
}

export const deriveEthereumPrivateKey = (wallet_index:string, mnemonic: string) => {
  const seed = mnemonicToSeedSync(mnemonic);
  const hdNode = HDNodeWallet.fromSeed(seed);
  const path = derivation_path_eth?.replace("x", `${wallet_index}`);
  const child = hdNode.derivePath(path);
  
  return child.privateKey;
}
