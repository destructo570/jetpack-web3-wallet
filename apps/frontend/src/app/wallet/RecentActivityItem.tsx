import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronRightIcon } from "lucide-react";
import React from "react";

const RecentActivityItem = () => {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-xl bg-muted p-4 cursor-pointer hover:bg-zinc-700 transition">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder-user.jpg" alt="Bitcoin" />
          <AvatarFallback className="bg-zinc-600 hover:bg-zinc-700 text-zinc-300">
            S
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">Sent</div>
          <div className="text-sm text-muted-foreground">
            To 2fgdf234m5445l4ml343lC
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 text-right">
        <div>
          <div className="font-medium">-7.20 SOL</div>
        </div>
        <ChevronRightIcon className="h-4 w-4" />
      </div>
    </div>
  );
};

export default RecentActivityItem;
