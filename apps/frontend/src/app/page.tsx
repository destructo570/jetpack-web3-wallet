"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import WalletCard from "@/components/common/WalletCard";
import SeedPhraseLoading from "@/components/common/SeedPhraseLoading";
import { Info } from "lucide-react";
import { toast } from "sonner";
import { getEthereumWallet, getMnemonicPhrase } from "@/lib/utils";

export default function page() {
  const [seed_phrase, setSeedPhrase] = useState("");
  const [loading] = useState(false);
  const [wallets, setWallets] = useState<
    {
      public_key: string;
      network: string;
    }[]
  >([]);

  const renderPhrases = () => {
    return seed_phrase?.split(" ")?.map((word, index) => {
      return (
        <div className="flex gap-2 items-center">
          <p className="w-[18px] text-muted-foreground text-right text-sm">
            {index + 1}
          </p>
          <p className="w-full bg-muted rounded-md flex items-center justify-center text-md font-medium px-2 py-1">
            {word}
          </p>
        </div>
      );
    });
  };

  const onGenerateClick = async () => {
    setSeedPhrase(getMnemonicPhrase());
  };

  const onAddNewWallet = async () => {
    const wallet = getEthereumWallet(wallets?.length, seed_phrase);
    setWallets((prev) => [...prev, wallet]);
  };

  const copyMneumonicToClipboard = () => {
    if (!seed_phrase) return;
    navigator.clipboard.writeText(seed_phrase);
    toast("", {
      description: "Copied mnemonic to clipboard",
      duration: 1000,
    });
  };

  return (
    <main className="flex flex-col items-center h-screen bg-background pt-36">
      <h1 className="text-3xl font-bold mb-8">Jetpack wallet 🚀</h1>
      {seed_phrase || loading ? (
        <Card
          className="w-full p-6  mt-4 cursor-pointer"
          onClick={copyMneumonicToClipboard}
        >
          <div className="grid grid-cols-3 gap-4">
            {loading ? <SeedPhraseLoading /> : renderPhrases()}
          </div>
          {seed_phrase ? (
            <div className="flex gap-2 items-center justify-center mt-4">
              <Info className="w-4 h-4" />
              <p className="text-sm">Click anywhere on the card to copy!</p>
            </div>
          ) : null}
        </Card>
      ) : null}
      <div className="my-8 flex gap-4">
        <Button onClick={onGenerateClick}>Generate mnemonic</Button>
        <Button onClick={onAddNewWallet} disabled={!seed_phrase || loading}>
          Add Wallet
        </Button>
      </div>
      <div className="w-full grid sm:grid-cols-2 gap-4 pb-4">
        {wallets?.map((wallet) => {
          return (
            <WalletCard
              public_key={wallet?.public_key}
              network={wallet?.network}
            />
          );
        })}
      </div>
    </main>
  );
}
