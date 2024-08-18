import { Button } from "@/components/ui/button";
import { ArrowLeftRight, DollarSign, Download, Plus, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import SendTokenPage from "@/components/SendTokenPage/SendTokenPage";
import Airdrop from "@/components/AirdropSolPage/Airdrop";

const PrimaryActions = (props) => {
  const { wallet, fetchWalletBalance } = props;
  const [open, setOpen] = React.useState({
    send_dialog: false,
    receive_dialog: false,
    swap_dialog: false,
    airdrop_dialog: false,
  });

  const renderActionDialog = (header, component, page, key) => {
    return (
      <Dialog
        open={open?.[key]}
        onOpenChange={(val) => setOpen((prev) => ({ ...prev, [key]: val }))}
        dialog
      >
        <DialogTrigger asChild>{component}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{header}</DialogTitle>
          </DialogHeader>
          {page}
        </DialogContent>
      </Dialog>
    );
  };

  const closeDialog = (key) => {
    setOpen((prev) => ({ ...prev, [key]: false }));
  };

  return (
    <div className="flex items-center justify-between gap-4">
      {renderActionDialog(
        "Receive",
        <Button
          variant="ghost"
          size="icon"
          className="h-16 w-full rounded-xl bg-muted hover:bg-zinc-700 transition flex flex-col gap"
        >
          <Plus className="h-6 w-6" color="#A1A1A1" />
          <p className="text-xs">Receive</p>
        </Button>,
        <></>,
        "receive_dialog"
      )}
      {renderActionDialog(
        "Send",
        <Button
          variant="ghost"
          size="icon"
          className="h-16 w-full rounded-xl bg-muted hover:bg-zinc-700 transition flex flex-col gap-2"
        >
          <Send className="h-6 w-6" color="#A1A1A1" />
          <p className="text-xs">Send</p>
        </Button>,
        <SendTokenPage
          wallet={wallet}
          onSendToken={fetchWalletBalance}
          closeDialog={closeDialog.bind(null, "send_dialog")}
        />,
        "send_dialog"
      )}
      {renderActionDialog(
        "Swap",
        <Button
          variant="ghost"
          size="icon"
          className="h-16 w-full rounded-xl bg-muted hover:bg-zinc-700 transition flex flex-col gap-2"
        >
          <ArrowLeftRight className="h-6 w-6" color="#A1A1A1" />
          <p className="text-xs">Swap</p>
        </Button>,
        <></>,
        "swap_dialog"
      )}
      {renderActionDialog(
        "Airdrop tokens on testnet",
        <Button
          variant="ghost"
          size="icon"
          className="h-16 w-full rounded-xl bg-muted hover:bg-zinc-700 transition flex flex-col gap-2"
        >
          <Download className="h-6 w-6" color="#A1A1A1" />
          <p className="text-xs">Airdrop</p>
        </Button>,
        <Airdrop
          onAirdrop={fetchWalletBalance}
          closeDialog={closeDialog.bind(null, "airdrop_dialog")}
        />,
        "airdrop_dialog"
      )}
    </div>
  );
};

export default PrimaryActions;
