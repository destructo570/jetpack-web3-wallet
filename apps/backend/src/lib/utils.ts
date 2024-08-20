import { ETHEREUM, SOLANA } from "../constants/urls";

export const getSolanaUrl = (api_key:string, type:string="mainnet") => {
  return `${SOLANA[type]}/${api_key}`;
}

export const getEthUrl = (api_key:string, type:string="mainnet") => {
  return `${ETHEREUM[type]}/${api_key}`;
}