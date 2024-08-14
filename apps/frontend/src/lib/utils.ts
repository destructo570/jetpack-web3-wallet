import { HDNode } from "@ethersproject/hdnode";
import { generateMnemonic } from "bip39";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
