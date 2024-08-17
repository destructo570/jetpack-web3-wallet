import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let data = await req?.json();
  try {
    let payload = {
      jsonrpc: "2.0",
      id: 1,
      method: "getBalance",
      params: [data?.wallet],
    };
    // let url = `https://api.devnet.solana.com`;
    let url = `https://api.mainnet-beta.solana.com`;

    const response = await axios.post(url, payload);
    return NextResponse.json(response?.data?.result || [], { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify(err), {
      status: 500,
    });
  }
}
