import { HDNode } from "@ethersproject/hdnode";
import { ETHEREUM, SOLANA } from "../constants/urls";

export const getEthereumWallet = (wallet_index: number, mnemonic: string) => {
  const derivation_path = `m/44'/501'/${wallet_index}'/0'`;
  const hd_node = HDNode.fromMnemonic(mnemonic).derivePath(derivation_path);

  const wallet = {
    network: "Ethereum",
    public_key: hd_node.address,
  };

  return wallet;
};

export const getSolanaUrl = (api_key:string, type:string="mainnet") => {
  return `${SOLANA[type]}/${api_key}`;
}

export const getEthUrl = (api_key:string, type:string="mainnet") => {
  return `${ETHEREUM[type]}/${api_key}`;
}