import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { sendSolanaToken } from "@/app/api/actions";

const SendTokenPage = (props) => {
  const { wallet, onSendToken, closeDialog} = props;
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState({
    amount: 0.0,
    receiver_address: "",
  });

  const onSendClick = async () => {
    setLoading(true);
    let seed_phrase = localStorage.getItem("seed_phrase") || "";
    let sender_pvt_key = wallet?.getSolanaWalletPrivateKey(seed_phrase);
    await sendSolanaToken(
      sender_pvt_key,
      payload?.receiver_address,
      payload?.amount
    );
    onSendToken();
    closeDialog();
    setLoading(false);
  };

  const onAmountChange = (e) => {
    setPayload((prev) => ({ ...prev, amount: e?.target?.value }));
  };
  const onRecepientChange = (e) => {
    setPayload((prev) => ({ ...prev, receiver_address: e?.target?.value }));
  };

  return (
    <form className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="network">Token</Label>
        <Select defaultValue="solana">
          <SelectTrigger id="network">
            <SelectValue placeholder="Select network" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="solana">Solana</SelectItem>
            {/* <SelectItem value="ethereum">Ethereum</SelectItem> */}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="recipient">Recipient Address</Label>
        <Input
          id="recipient"
          placeholder="Enter recipient address"
          required
          value={payload?.receiver_address}
          onChange={onRecepientChange}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          min="0"
          step="0.000001"
          placeholder="Enter amount"
          required
          value={payload?.amount}
          onChange={onAmountChange}
        />
      </div>
      <Button
        type="button"
        className="w-full"
        onClick={onSendClick}
        disabled={loading}
      >
        Send
      </Button>
    </form>
  );
};

export default SendTokenPage;
