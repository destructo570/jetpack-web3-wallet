"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Card } from "../ui/card";
import { toast } from "sonner";
import { Info, InfoIcon } from "lucide-react";
import { Button } from "../ui/button";
import { getMnemonicPhrase } from "@/lib/utils";
import { Input } from "../ui/input";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { validateMnemonic } from "bip39";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const SeedPhraseCard = (props) => {
  const { is_create = false } = props;
  const router = useRouter();
  const [isPasting, setIsPasting] = useState(false);
  const [is_invalid, setIsInvalid] = useState(false);
  const [seed_phrase, setSeedPhrase] = useState(Array(12).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 12);
  }, []);

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
    if (!isPasting) {
      const newInputs = [...seed_phrase];
      newInputs[index] = e.target.value;
      setSeedPhrase(newInputs);
    }
  };

  const onPaste = (index, e) => {
    e?.preventDefault();
    setIsPasting(true);

    let pastedText = e.clipboardData.getData("text");
    let words = pastedText?.split(" ");
    if (words.length === 12) {
      setSeedPhrase(words);
    } else {
      // Handle single word paste
      const new_seed_phrase = [...seed_phrase];
      new_seed_phrase[index] = pastedText;
      setSeedPhrase(new_seed_phrase);
    }

    // Reset isPasting after the current execution context
    setTimeout(() => setIsPasting(false), 0);
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
            onChange={(e) => onChange(index, e)}
            onPaste={(e) => onPaste(index, e)}
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
    const is_valid = validateMnemonic(seed_phrase?.join(" "));

    if (is_valid) {
      setIsInvalid(false);
      localStorage.setItem("seed_phrase", seed_phrase?.join(" "));
      router.push("/wallet");
    } else {
      setIsInvalid(true);
    }
  };

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
          <Button
            onClick={gotoWalletPage}
            className="w-full"
            disabled={is_empty}
          >
            Proceed
          </Button>
        </div>
      ) : (
        <Button onClick={gotoWalletPage} disabled={is_empty}>
          Import wallet
        </Button>
      )}
      {is_invalid && !is_create ? (
        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Invalid Seed Phrase Detected!</AlertTitle>
          <AlertDescription>
            Please check your all the words and try again.
          </AlertDescription>
          {/* <div className="w-full">
          </div> */}
        </Alert>
      ) : null}
    </div>
  );
};

export default SeedPhraseCard;
