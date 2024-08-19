import axios from "axios";
import { Hono } from "hono";
import { env } from "hono/adapter";
import { getEthUrl, getSolanaUrl } from "../lib/utils";

const walletRoutes = new Hono();

walletRoutes.post("/get-eth-balance", async (c) => {
  const { ALCHEMY_KEY } = env<{ ALCHEMY_KEY: string }>(c);
  try {
    const { publicKey, network_type } = (await c.req.json()) || {};
    let payload = {
      id: 1,
      jsonrpc: "2.0",
      method: "eth_getBalance",
      params: [publicKey, "latest"],
    };

    let url = getEthUrl(ALCHEMY_KEY, network_type);
    const response = await axios.post(url, payload);
    
    return c.json(response?.data);
  } catch (err) {
    c.status(500);
    return c.text("Internal server error");
  }
});

walletRoutes.post("/get-sol-balance", async (c) => {
  const { ALCHEMY_KEY } = env<{ ALCHEMY_KEY: string }>(c);
  try {
    const { publicKey, network_type } = (await c.req.json()) || {};
    let payload = {
      jsonrpc: "2.0",
      id: 1,
      method: "getBalance",
      params: [publicKey],
    };

    let url = getSolanaUrl(ALCHEMY_KEY, network_type);
    const response = await axios.post(url, payload);
    return c.json(response?.data?.result);
  } catch (err) {
    c.status(500);
    return c.text("Internal server error");
  }
});

export default walletRoutes;
