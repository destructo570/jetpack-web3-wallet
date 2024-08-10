import axios from "axios";


const base_url = "https://jetpack-web3-wallet-backend.onrender.com";

export const getSeedPhrase = async () => {
  try {
    const response = axios.get(`${base_url}/wallet/seed-phrase`);
    return response;
  } catch (error) {
    console.log("error", error);
  }
};

export const addNewWallet = async (payload: {}) => {
  try {
    const response = axios.post(`${base_url}/wallet/add-wallet`, payload);
    return response;
  } catch (error) {
    console.log("error", error);
  }
};
