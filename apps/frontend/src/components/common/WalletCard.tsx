import React from "react";

import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export default function WalletCard(props: {
  public_key: string;
  network: string;
}) {
  const { public_key, network } = props;

  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(public_key);
    toast("", {
      description: "Copied to clipboard",
      duration: 1000,
    });
  }
  
  return (
    <Card className="py-2 px-3 rounded-lg cursor-pointer" onClick={copyAddressToClipboard}>
      <div>
        <p className="text-sm text-muted-foreground">{network}</p>
      </div>
      <p className="text-sm truncate text-ellipsis">{public_key}</p>
    </Card>
  );
}
