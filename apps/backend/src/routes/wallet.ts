import { HDNode } from "@ethersproject/hdnode";
import { generateMnemonic } from "bip39";
import { Hono } from "hono";

const walletRoutes = new Hono<{
  Bindings: {};
}>();

walletRoutes.get("/seed-phrase", async (c) => {
  const mnemonic = generateMnemonic();

  if (!mnemonic) {
    c.status(403);
    return c.json({ error: "User not found" });
  }

  return c.json({ seed_phrase: mnemonic });
});

walletRoutes.post("/add-wallet", async (c) => {
  const { wallet_index, mnemonic } = await c.req.json();
  const derivation_path = `m/44'/501'/${wallet_index}'/0'`;
  const hd_node = HDNode.fromMnemonic(mnemonic).derivePath(derivation_path);
  const wallet = {
    network: "Ethereum",
    public_key: hd_node.address,
  };
  return c.json({ wallet });
});

export default walletRoutes;
