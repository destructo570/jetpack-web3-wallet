import { ETHEREUM, SOLANA } from "../constants/urls";

type solNetworkType = "mainnet" | "devnet";
type ethNetworkType = "mainnet" | "sepolia" | "holesky";

export const getSolanaUrl = (api_key:string, type:solNetworkType="mainnet") => {
  return `${SOLANA[type]}/${api_key}`;
}

export const getEthUrl = (api_key:string, type:ethNetworkType="mainnet") => {
  return `${ETHEREUM[type]}/${api_key}`;
}