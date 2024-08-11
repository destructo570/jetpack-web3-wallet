"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import WalletCard from "@/components/common/WalletCard";
import { addNewWallet, getSeedPhrase } from "@/api/actions";
import SeedPhraseLoading from "@/components/common/SeedPhraseLoading";

export default function page() {
  const [seed_phrase, setSeedPhrase] = useState("");
  const [loading, setLoading] = useState(false);
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
          <p className="w-full bg-muted rounded-md flex items-center justify-center text-md font-medium  px-2 py-1">
            {word}
          </p>
        </div>
      );
    });
  };

  const onGenerateClick = async () => {
    setLoading(true);
    const response = await getSeedPhrase();
    if (response && response?.status === 200) {
      setSeedPhrase(response?.data?.seed_phrase);
    }
    setLoading(false);
  };

  const onAddNewWallet = async () => {
    let payload = {
      wallet_index: wallets?.length,
      mnemonic: seed_phrase,
    };
    const response = await addNewWallet(payload);
    if (response && response?.status === 200) {
      setWallets((prev) => [...prev, response?.data?.wallet]);
    }
  };

  return (
    <main className="flex flex-col items-center h-screen bg-background pt-36">
      <h1 className="text-3xl font-bold mb-8">Jetpack wallet</h1>
      {seed_phrase || loading ? (
        <Card className="w-full p-6 grid grid-cols-3 gap-4">
          {loading ? <SeedPhraseLoading /> : renderPhrases()}
        </Card>
      ) : null}
      <div className="my-8 flex gap-4">
        <Button onClick={onGenerateClick}>Generate mnemonic</Button>
        <Button onClick={onAddNewWallet}>Add Wallet</Button>
      </div>
      <div className="w-full grid grid-cols-2 gap-4">
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
