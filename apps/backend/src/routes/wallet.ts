import axios from "axios";
import { Hono } from "hono";
import { env } from "hono/adapter";
import { getEthUrl, getSolanaUrl } from "../lib/utils";

const walletRoutes = new Hono();

walletRoutes.post("/get-eth-balance", async (c) => {
  const { ALCHEMY_KEY } = env<{ ALCHEMY_KEY: string }>(c);
  try {
    const { public_key, network_type } = (await c.req.json()) || {};
    let payload = {
      id: 1,
      jsonrpc: "2.0",
      method: "eth_getBalance",
      params: [public_key, "latest"],
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
    const { public_key, network_type } = (await c.req.json()) || {};
    let payload = {
      jsonrpc: "2.0",
      id: 1,
      method: "getBalance",
      params: [public_key],
    };

    let url = getSolanaUrl(ALCHEMY_KEY, network_type);
    const response = await axios.post(url, payload);
    return c.json(response?.data?.result);
  } catch (err) {
    c.status(500);
    return c.text("Internal server error");
  }
});

walletRoutes.get("/get-sol-nfts", async (c) => {
  const { SHYFT_API_KEY } = env<{ SHYFT_API_KEY: string }>(c);
  try {
    const { public_key, page, size } = c.req.query();
    let url = `https://api.shyft.to/sol/v2/nft/read_all`;

    let payload = {
      params: {
        network: "mainnet-beta",
        address: public_key,
        page,
        size,
      },
      headers: {
        "Content-Type": "application/json",
        "x-api-key": SHYFT_API_KEY,
      },
    };
    const response = await axios.get(url, payload);

    return c.json(response?.data?.result);
  } catch (err) {
    c.status(500);
    return c.text("Internal server error");
  }
});

walletRoutes.post("/airdrop-sol", async (c) => {
  const { ALCHEMY_KEY } = env<{ ALCHEMY_KEY: string }>(c);
  try {
    const { public_key, amount } = (await c.req.json()) || {};

    let payload = {
      id: 1,
      jsonrpc: "2.0",
      method: "requestAirdrop",
      params: [public_key, parseFloat(amount) * 1000000000],
    };

    let url = getSolanaUrl(ALCHEMY_KEY, "devnet");
    const response = await axios.post(url, payload);

    return c.json(response?.data);
  } catch (err) {
    c.status(500);
    return c.text("Internal server error");
  }
});

export default walletRoutes;
