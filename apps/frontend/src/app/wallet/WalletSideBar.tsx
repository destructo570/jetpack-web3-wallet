"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronRight, Copy } from "lucide-react";
import { getWallet } from "@/lib/utils";
import { NETWORK } from "@/lib/constants";
import { copyToClipboard } from "@/lib/helpers";

const WalletSideBar = () => {
  const [wallets, setWallets] = useState([]);
  console.log("wallets", wallets);

  const onAddWallet = () => {
    let seed_phrase = localStorage.getItem("seed_phrase");
    setWallets((prev) => [...prev, getWallet(wallets?.length, seed_phrase)]);
  };

  const renderWallet = (wallet, index) => {
    return (
      <div className="flex items-center gap-2 justify-between rounded-lg bg-muted px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground cursor-pointer">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 border ">
            <AvatarImage src="/placeholder-user.jpg" alt="Wallet" />
            <AvatarFallback className="bg-zinc-200">A</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-md font-bold">Account {index + 1}</p>
          </div>
        </div>
        <ChevronRight size={16} />
      </div>
    );
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
      <div className="flex h-16 items-center justify-between border-b px-4">
        <Link
          href="#"
          className="flex items-center gap-2 font-semibold"
          prefetch={false}
        >
          <WalletIcon className="h-6 w-6" />
          <span>Jetpack wallet</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Wallets</h2>
            <Button size="sm" variant="outline" onClick={onAddWallet}>
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Wallet
            </Button>
          </div>
          <div className="grid gap-2">
            {wallets?.map((wallet, index) => {
              let sol_public_key = wallet?.[NETWORK.SOLANA]?.publicKey;
              let eth_public_key = wallet?.[NETWORK.ETHEREUM]?.publicKey;
              let btc_public_key = wallet?.[NETWORK.BITCOIN]?.publicKey;
              return (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        {renderWallet(wallet, index)}
                      </TooltipTrigger>
                      <TooltipContent side="right" className="min-w-[320px]" align="start" sideOffset={8}>
                        <div>
                          <div className="flex gap-2 justify-between">
                            <p className="text-base">Solana:</p>
                            <div className="max-w-[200px] flex gap-2 justify-between items-center">
                              <p className="truncate text-base">
                                {sol_public_key}
                              </p>
                              <Copy
                                size={16}
                                className="min-w-[24px] cursor-pointer"
                                onClick={(e) => {
                                  e?.stopPropagation();
                                  copyToClipboard(sol_public_key);
                                }}
                              />
                            </div>
                          </div>
                          <div className="flex gap-2  justify-between">
                            <p className="text-base">Ethereum:</p>
                            <div className="max-w-[200px] flex gap-2 justify-between items-center">
                              <p className="truncate text-base">
                                {eth_public_key}
                              </p>
                              <Copy
                                size={16}
                                className="min-w-[24px] cursor-pointer"
                                onClick={(e) => {
                                  e?.stopPropagation();
                                  copyToClipboard(eth_public_key);
                                }}
                              />
                            </div>
                          </div>
                          <div className="flex gap-2  justify-between">
                            <p className="text-base">Bitcoin:</p>
                            <div className="max-w-[200px] flex gap-2 justify-between items-center">
                              <p className="truncate text-base">
                                {btc_public_key}
                              </p>
                              <Copy
                                size={16}
                                className="min-w-[24px] cursor-pointer"
                                onClick={(e) => {
                                  e?.stopPropagation();
                                  copyToClipboard(btc_public_key);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default WalletSideBar;

function WalletIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
      <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
    </svg>
  );
}

function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
