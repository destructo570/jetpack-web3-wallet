import { HDNode } from "@ethersproject/hdnode";
import { generateMnemonic, mnemonicToSeedSync} from "bip39";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  // COIN_TYPE,
  // derivation_path_bitcoin,
  // derivation_path_eth,
  derivation_path_sol,
  NETWORK,
} from "./constants";
import nacl from "tweetnacl";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";

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

export const getWallet = (wallet_index: number, mnemonic: string) => {
  const seed = mnemonicToSeedSync(mnemonic);

  const derivedSeedSol = derivePath(
    derivation_path_sol?.replace("x", `${wallet_index}`),
    seed.toString("hex")
  ).key;
  // const derivedSeedBtc = derivePath(
  //   derivation_path_bitcoin?.replace("x", `${wallet_index}`),
  //   seed.toString("hex")
  // ).key;
  // const derivedSeedEth = derivePath(
  //   derivation_path_eth?.replace("x", `${wallet_index}`),
  //   seed.toString("hex")
  // ).key;

  const secret_sol = nacl.sign.keyPair.fromSeed(derivedSeedSol).secretKey;
  // const secret_btc = nacl.sign.keyPair.fromSeed(derivedSeedBtc).secretKey;
  // const secret_eth = nacl.sign.keyPair.fromSeed(derivedSeedEth).secretKey;

  const wallet = {
    [NETWORK.SOLANA]: {
      publicKey: Keypair.fromSecretKey(secret_sol)
        .publicKey.toBase58()
        .toString(),
      privateKey: Keypair.fromSecretKey(secret_sol).secretKey,
    },
    // [NETWORK.BITCOIN]: {
    //   publicKey: Keypair.fromSecretKey(secret_btc).publicKey.toString(),
    //   privateKey: Keypair.fromSecretKey(secret_btc).secretKey,
    // },
    // [NETWORK.ETHEREUM]: {
    //   publicKey: Keypair.fromSecretKey(secret_eth).publicKey.toString(),
    //   privateKey: Keypair.fromSecretKey(secret_eth).secretKey,
    // },
  };

  return wallet;
};
