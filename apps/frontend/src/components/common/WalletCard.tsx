import React from "react";

import { Card } from "@/components/ui/card";

export default function WalletCard(props: {
  public_key: string;
  network: string;
}) {
  const { public_key, network } = props;
  return (
    <Card className="py-2 px-3 rounded-lg">
      <div>
        <p className="text-sm text-muted-foreground">{network}</p>
      </div>
      <p className="text-sm truncate text-ellipsis">{public_key}</p>
    </Card>
  );
}
