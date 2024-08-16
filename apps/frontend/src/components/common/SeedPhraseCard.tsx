"use client";
import React, { useMemo, useState } from "react";
import { Card } from "../ui/card";
import { toast } from "sonner";
import { Info } from "lucide-react";
import { Button } from "../ui/button";
import { getMnemonicPhrase } from "@/lib/utils";
import { Input } from "../ui/input";
import clsx from "clsx";
import { useRouter } from 'next/navigation'

const SeedPhraseCard = (props) => {
  const { is_create = false } = props;
  const router = useRouter()
  const [seed_phrase, setSeedPhrase] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const copyMneumonicToClipboard = () => {
    if (!seed_phrase || !is_create) return;
    navigator.clipboard.writeText(seed_phrase?.join(" "));
    toast("", {
      description: "Copied mnemonic to clipboard",
      duration: 1000,
    });
  };

  const onGenerateClick = (e) => {
    e?.stopPropagation();
    setSeedPhrase(getMnemonicPhrase()?.split(" "));
  };

  const onChange = (index, e) => {
    setSeedPhrase((prev) => {
      let new_item = e?.target?.value;
      let new_list = [...prev];
      if (index >= 0 && index < new_list.length) {
        // Replace the item at the specified index
        new_list[index] = new_item;
      } else if (index === new_list.length) {
        // If the index is exactly the array length, push the item to the end
        new_list.push(new_item);
      }
      return new_list;
    });
  };

  const renderPhrases2 = () => {
    let elements = [];
    for (let index = 0; index < 12; index++) {
      elements.push(
        <div className="flex gap-2 items-center">
          <p className="w-[18px] text-muted-foreground text-right text-sm">
            {index + 1}
          </p>
          <Input
            disabled={is_create}
            className="w-full bg-muted rounded-md flex items-center justify-center text-md font-medium px-2 py-1"
            value={seed_phrase?.[index]}
            onChange={onChange.bind(null, index)}
          />
        </div>
      );
    }
    return elements;
  };

  const is_empty = useMemo(() => {
    let result = false;
    seed_phrase?.forEach((word) => {
      if (!word) {
        result = true;
      }
    });
    return result;
  }, [seed_phrase]);

  const gotoWalletPage = () => {
    localStorage.setItem("seed_phrase", seed_phrase?.join(" "));
    router.push("/wallet");
  }

  return (
    <div className="flex flex-col gap-8">
      <Card
        className={clsx("w-full p-6 mt-4 flex flex-col gap-4", {
          "cursor-pointer": is_create,
        })}
        onClick={copyMneumonicToClipboard}
      >
        <div className="grid grid-cols-3 gap-4">{renderPhrases2()}</div>

        {is_create && !is_empty ? (
          <div className="flex gap-2 items-center justify-center mt-4">
            <Info className="w-4 h-4" />
            <p className="text-sm">Click anywhere on the card to copy!</p>
          </div>
        ) : null}
      </Card>
      {is_create ? (
        <div className="flex gap-4 items-center w-full">
          <Button onClick={onGenerateClick} className="w-full">
            Create new wallet
          </Button>
          <Button onClick={gotoWalletPage} className="w-full" disabled={is_empty}>
            Proceed
          </Button>
        </div>
      ) : (
        <Button onClick={gotoWalletPage} disabled={is_empty}>
          Import wallet
        </Button>
      )}
    </div>
  );
};

export default SeedPhraseCard;
