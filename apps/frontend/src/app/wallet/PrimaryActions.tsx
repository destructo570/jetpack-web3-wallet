import { Button } from "@/components/ui/button";
import { ArrowLeftRight, DollarSign, Plus, Send } from "lucide-react";
import React from "react";

const PrimartActions = () => {
  return (
    <div className="flex items-center justify-between gap-4">
      <Button
        variant="ghost"
        size="icon"
        className="h-16 w-full rounded-xl bg-muted hover:bg-zinc-700 transition flex flex-col gap"
      >
        <Plus className="h-6 w-6" color="#A1A1A1" />
        <p className="text-xs">Receive</p>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-16 w-full rounded-xl bg-muted hover:bg-zinc-700 transition flex flex-col gap-2"
      >
        <Send className="h-6 w-6" color="#A1A1A1" />
        <p className="text-xs">Send</p>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-16 w-full rounded-xl bg-muted hover:bg-zinc-700 transition flex flex-col gap-2"
      >
        <ArrowLeftRight className="h-6 w-6" color="#A1A1A1" />
        <p className="text-xs">Swap</p>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-16 w-full rounded-xl bg-muted hover:bg-zinc-700 transition flex flex-col gap-2"
      >
        <DollarSign className="h-6 w-6" color="#A1A1A1" />
        <p className="text-xs">Buy</p>
      </Button>
    </div>
  );
};

export default PrimartActions;
