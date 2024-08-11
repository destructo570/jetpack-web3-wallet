import { generateMnemonic } from "bip39";
import { Hono } from "hono";
import { rateLimiter } from "hono-rate-limiter";
import { getEthereumWallet } from "../lib/utils";

const limiter = rateLimiter({
  windowMs: 60 * 1000, // 1 minutes
  limit: 10, // Limit each IP to 100 requests per `window` (here, per 1 minutes).
  standardHeaders: "draft-6", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  keyGenerator: (c) => "<unique_key>", // Method to generate custom identifiers for clients.
});

const walletRoutes = new Hono<{
  Bindings: {};
}>();

walletRoutes.use(limiter);

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
