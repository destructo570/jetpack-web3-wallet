"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import WalletCard from "@/components/common/WalletCard";
import SeedPhraseLoading from "@/components/common/SeedPhraseLoading";
import { Info } from "lucide-react";
import { toast } from "sonner";
import { getEthereumWallet, getMnemonicPhrase } from "@/lib/utils";
import { Input } from "@/components/ui/input";

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

  const copyMneumonicToClipboard = () => {
    if (!seed_phrase) return;
    navigator.clipboard.writeText(seed_phrase);
    toast("", {
      description: "Copied mnemonic to clipboard",
      duration: 1000,
    });
  };

  const renderImportWallet = () => {
    return (
      <form className="flex items-center gap-2 w-full">
        <Input
          type="text"
          placeholder="Enter your private key"
          className="flex-1 rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <Button
          type="button"
          className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Import wallet
        </Button>
      </form>
    );
  };

  const onNextClick = () => {};

  return (
    <main className="flex flex-col items-center h-screen bg-background pt-36">
      <h1 className="text-3xl font-bold mb-8">Jetpack wallet 🚀</h1>
      {seed_phrase ? null : (
        <>
          {renderImportWallet()} <h3 className="text-xl font-bold my-8">Or</h3>
        </>
      )}

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
      <div className={`flex gap-4 ${seed_phrase ? "mt-4" : ""}`}>
        {!seed_phrase ? (
          <Button onClick={onGenerateClick}>Create new wallet</Button>
        ) : null}
        {seed_phrase ? <Button onClick={onNextClick}>Next</Button> : null}
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
