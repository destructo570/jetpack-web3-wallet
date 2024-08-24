import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Wallet } from "./Wallet";
import { formatUnits } from "ethers";

export class JetPackWallet {
  wallet_name: string;
  solana_wallet: Wallet;
  ethereum_wallet: Wallet;

  constructor(
    wallet_name: string,
    solana_wallet: Wallet,
    ethereum_wallet: Wallet
  ) {
    this.wallet_name = wallet_name;
    this.solana_wallet = solana_wallet;
    this.ethereum_wallet = ethereum_wallet;
  }

  getWalletName() {
    return this.wallet_name;
  }

  //SOLANA
  getSolanaWallet() {
    return this.solana_wallet;
  }

  getSolanaWalletPrivateKey(seed: string) {
    return this.solana_wallet.getPrivateKeyFromSeed(seed);
  }

  getSolanaPublicKey() {
    return this.solana_wallet?.getPublicKey();
  }

  //ETHEREUM
  getEthereumPublicKey() {
    return this.ethereum_wallet?.getPublicKey();
  }

  getEthereumWallet() {
    return this.ethereum_wallet;
  }

  getEthereumWalletPrivateKey(seed: string) {
    return this.ethereum_wallet.getPrivateKeyFromSeed(seed);
  }

  
  static convertLamportsToSol(value: string | number | bigint){
    return BigInt(value) / BigInt(LAMPORTS_PER_SOL);
  }

  static convertHexToEth(value: string | number | bigint){
    return formatUnits(BigInt(value || 0).toString());
  }
}
