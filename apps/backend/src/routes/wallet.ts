import { generateMnemonic } from "bip39";
import { Hono } from "hono";
import { getEthereumWallet } from "../lib/utils";

const walletRoutes = new Hono<{
  Bindings: {};
}>();

walletRoutes.get("/seed-phrase", async (c) => {
  const mnemonic = generateMnemonic();

  if (!mnemonic) {
    c.status(500);
    return c.json({ error: "Internal server error" });
  }

  return c.json({ seed_phrase: mnemonic });
});

walletRoutes.post("/get-wallet", async (c) => {
  const { wallet_index, mnemonic } = await c.req.json();
  const wallet = getEthereumWallet(wallet_index, mnemonic);

  if (!wallet) {
    c.status(500);
    return c.json({ error: "Internal server error" });
  }

  return c.json({ wallet });
});

export default walletRoutes;
