export const BACKEND_URL_DEV = "http://localhost:3001";
export const BACKEND_URL_PROD = "https://jetpack-web3-wallet-backend.onrender.com";

export const NETWORK = {
  SOLANA: "SOLANA",
  ETHEREUM: "ETHEREUM",
  BITCOIN: "BITCOIN",
};

export const COIN_TYPE = {
  [NETWORK.BITCOIN]: "0",
  [NETWORK.ETHEREUM]: "60",
  [NETWORK.SOLANA]: "501",
};

export const derivation_path_bitcoin = `m/44'/${COIN_TYPE[NETWORK.BITCOIN]}'/x'/0'`;
export const derivation_path_eth = `m/44'/${COIN_TYPE[NETWORK.ETHEREUM]}'/0'/0/x`;
export const derivation_path_sol = `m/44'/${COIN_TYPE[NETWORK.SOLANA]}'/x'/0'`;
