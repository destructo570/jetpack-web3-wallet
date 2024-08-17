import { deriveEthereumPrivateKey, deriveSolanaPrivateKey } from "@/lib/utils";
import { NETWORK } from "../lib/constants";
import { PublicKey } from "@solana/web3.js";

export class Wallet {
  index: string;
  publicKey: string;
  network: string;
  publicKeyObj: PublicKey;

  constructor(index: number, publicKey: string, network: string, publicKeyObj: PublicKey) {
    this.index = `${index}`;
    this.publicKey = publicKey;
    this.network = network;
    this.publicKeyObj = publicKeyObj;
  }

  getPublicKey() {
    return this.publicKey;
  }

  //TODO: refactor
  getPublicKeyObj() {
    return this.publicKeyObj;
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
