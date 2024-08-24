import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Copy } from "lucide-react";
import { JetPackWallet } from "@/model/JetPackWallet";
import { copyToClipboard } from "@/lib/helpers";
import Image from "next/image";

const ReceivePage = (props: { wallet: JetPackWallet }) => {
  const { wallet } = props;
  const onCopy = (address) => {
    copyToClipboard(address);
  };
  const renderWalletInfo = (name, address, icon) => {
    return (
      <div
        className="flex justify-between items-center gap-4 rounded-xl bg-muted p-4 cursor-pointer hover:bg-zinc-700 transition"
        onClick={onCopy.bind(null, address)}
      >
        <>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center gap-2 text-right h-10 w-10 ">
              <Image width={24} height={24} src={icon} alt="" />
            </div>
            <div>
              <div className="font-medium">{name}</div>
              <div className="text-sm text-muted-foreground max-w-[240px] truncate text-ellipsis">
                {address}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 text-right h-10 w-10 bg-zinc-900 rounded-full">
            <Copy className="h-4 w-4" color="#A1A1A1" />
          </div>
        </>
      </div>
    );
  };
  let sol_address = wallet.getSolanaPublicKey();
  let eth_address = wallet.getEthereumPublicKey();
  return (
    <div className="flex flex-col gap-4">
      {renderWalletInfo("Solana", sol_address, "/solana-sol-logo.svg")}{" "}
      {renderWalletInfo("Ethereum", eth_address, "/ethereum-eth-logo.svg")}
    </div>
  );
};

export default ReceivePage;
