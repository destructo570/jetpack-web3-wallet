import SkeletonLoader from "@/components/common/SkeletonLoader";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronRightIcon } from "lucide-react";
import React from "react";

const TokenItem = (props) => {
  const { name, ticker, balance, loading } = props;

  const loader = () => {
    return (
      <>
        <div className="flex items-center gap-3">
          <SkeletonLoader width={40} height={40} borderRadius="100%" />
          <div>
            <SkeletonLoader width={60} height={18} borderRadius={6} />
            <SkeletonLoader width={140} height={18} borderRadius={6} />
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-xl bg-muted p-4 cursor-pointer hover:bg-zinc-700 transition">
      {loading ? (
        loader()
      ) : (
        <>
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder-user.jpg" alt="Bitcoin" />
              <AvatarFallback className="bg-zinc-600 hover:bg-zinc-700 text-zinc-300">
                {name?.[0] || "A"}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{name}</div>
              <div className="text-sm text-muted-foreground">{`${balance || 0} ${ticker}`}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-right">
            {/* <div>
          <div className="font-medium">$7,500</div>
        </div> */}
            <ChevronRightIcon className="h-4 w-4" />
          </div>
        </>
      )}
    </div>
  );
};

export default TokenItem;
