import { handleErrorResponse, in_dev_env } from "@/lib/helpers";
import axios from "axios";

const base_url = in_dev_env
  ? "http://localhost:3001"
  : "https://jetpack-web3-wallet-backend.onrender.com";

export const getSeedPhrase = async () => {
  try {
    const response = await axios.get(`${base_url}/wallet/seed-phrase`);
    return response;
  } catch (error) {
    handleErrorResponse(error);
  }
};

export const addNewWallet = async (payload: {}) => {
  try {
    const response = await axios.post(`${base_url}/wallet/get-wallet`, payload);
    return response;
  } catch (error) {
    handleErrorResponse(error);
  }
};
