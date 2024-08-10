import axios from "axios";


const base_url = "http://localhost:3001";

export const getSeedPhrase = async () => {
  try {
    const response = axios.get(`${base_url}/wallet/seed-phrase`);
    return response;
  } catch (error) {
    console.log("error", error);
  }
};

export const addNewWallet = async (payload) => {
  try {
    const response = axios.post(`${base_url}/wallet/add-wallet`, payload);
    return response;
  } catch (error) {
    console.log("error", error);
  }
};
