import React from "react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const CollectibleItem = (props) => {
  const { nft } = props;
  const [open, setOpen] = React.useState(false);

  const renderNftDialog = () => {
    return (
      <Dialog open={open} onOpenChange={(val) => setOpen(val)}>
        <DialogTrigger asChild>
          <Image
            src={nft?.image_uri}
            alt=""
            width={150}
            height={150}
            className="rounded-md object-cover w-full max-h-[150px] min-h-[150px] cursor-pointer"
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{nft?.name}</DialogTitle>
          </DialogHeader>
          <div>
            <Image
              src={nft?.image_uri}
              alt=""
              width={300}
              height={300}
              className="rounded-md object-cover w-full h-full max-h-[300px] min-h-[300px]"
            />
            {nft?.description ? (
              <div className="mt-3">
                <p className="text-sm text-muted-foreground ">Description</p>
                <p className="text-sm">{nft?.description}</p>
              </div>
            ) : null}
            {nft?.collection?.name ? (
              <div className="mt-3">
                <p className="text-sm text-muted-foreground ">Collection</p>
                <p className="text-sm">{nft?.collection?.name}</p>
              </div>
            ) : null}
            {nft?.attributes_array?.length ? (
              <div className="mt-3">
                <p className="text-sm text-muted-foreground ">Properties</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {nft?.attributes_array?.map((trait) => {
                    return (
                      <div className="border rounded-md px-3 py-1 min-w-[80px]">
                        <p className="text-xs text-muted-foreground uppercase">
                          {trait?.trait_type}
                        </p>
                        <p className="text-sm">{trait?.value}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>{renderNftDialog()}</TooltipTrigger>
        <TooltipContent side="bottom">
          <div>
            <p className="text-sm">{nft?.name}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CollectibleItem;
