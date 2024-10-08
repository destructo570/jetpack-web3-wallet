import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import dotenv from 'dotenv';
import walletRoutes from "./routes/wallet";

dotenv.config();

const app = new Hono();
app.use("/*", cors());
app.route("/wallet", walletRoutes);
app.get("/", (c) => {
  return c.text("This is jetpack!");
});

const port = 3001;

serve({
  fetch: app.fetch,
  port,
});
