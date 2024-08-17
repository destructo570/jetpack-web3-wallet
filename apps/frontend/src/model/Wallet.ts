import { deriveEthereumPrivateKey, deriveSolanaPrivateKey } from "@/lib/utils";
import { NETWORK } from "../lib/constants";

export class Wallet {
  index: string;
  publicKey: string;
  network: string;

  constructor(index: number, publicKey: string, network: string) {
    this.index = `${index}`;
    this.publicKey = publicKey;
    this.network = network;
  }

  getPublicKey() {
    return this.publicKey;
  }

  getWalletIndex() {
    return this.index;
  }

  getPrivateKeyFromSeed(seed: string) {
    switch (this.network) {
      case NETWORK.SOLANA:
        return deriveSolanaPrivateKey(this.index, seed);
      case NETWORK.ETHEREUM:
        return deriveEthereumPrivateKey(this.index, seed);
      default:
        break;
    }
  }
}
