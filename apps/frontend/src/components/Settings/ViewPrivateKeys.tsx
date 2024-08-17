import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { copyToClipboard } from "@/lib/helpers";
import { Copy } from "lucide-react";

const ViewPrivateKeys = (props) => {
  const { wallets } = props;

  const renderWallet = (wallet) => {
    let seed_phrase = localStorage.getItem("seed_phrase") || "";
    let sol_public_key = wallet?.getSolanaWalletPrivateKey(seed_phrase);
    let eth_public_key = wallet?.getEthereumWalletPrivateKey(seed_phrase);
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>{wallet?.wallet_name}</AccordionTrigger>
          <AccordionContent>
            <div>
              <div className="flex gap-2 justify-between">
                <p className="text-base">Solana:</p>
                <div className="max-w-[200px] flex gap-2 justify-between items-center">
                  <p className="truncate text-base">{sol_public_key}</p>
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
                  <p className="truncate text-base">{eth_public_key}</p>
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
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  };
  return (
    <div>
      <h3>View private keys</h3>
      <div className="mt-4">
        {wallets?.map((wallet) => {
          return renderWallet(wallet);
        })}
      </div>
    </div>
  );
};

export default ViewPrivateKeys;
