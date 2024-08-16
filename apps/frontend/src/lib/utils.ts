import { HDNode } from "@ethersproject/hdnode";
import { generateMnemonic } from "bip39";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { COIN_TYPE, NETWORK } from "./constants";

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
  const derivation_path_bitcoin = `m/44'/${COIN_TYPE[NETWORK.BITCOIN]}'/${wallet_index}'/0'`;
  const derivation_path_eth = `m/44'/${COIN_TYPE[NETWORK.ETHEREUM]}'/${wallet_index}'/0'`;
  const derivation_path_sol = `m/44'/${COIN_TYPE[NETWORK.SOLANA]}'/${wallet_index}'/0'`;

  const wallet = {
    [NETWORK.BITCOIN]: HDNode.fromMnemonic(mnemonic).derivePath(
      derivation_path_bitcoin
    ),
    [NETWORK.ETHEREUM]:
      HDNode.fromMnemonic(mnemonic).derivePath(derivation_path_eth),
    [NETWORK.SOLANA]:
      HDNode.fromMnemonic(mnemonic).derivePath(derivation_path_sol),
  };

  return wallet;
};
