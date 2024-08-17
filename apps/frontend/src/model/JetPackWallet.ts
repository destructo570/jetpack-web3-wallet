import { Wallet } from "./Wallet";

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
}
