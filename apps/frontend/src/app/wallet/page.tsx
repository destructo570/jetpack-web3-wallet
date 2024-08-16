"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import WalletSideBar from "./WalletSideBar";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import WalletTooltipInfo from "./WalletTooltipInfo";
import { ArrowLeftRight, DollarSign, Plus, Send } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function Component() {
  const [selected_wallet, setSelectedWallet] = useState();
  const renderHeader = () => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center justify-center gap-4 cursor-default">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="Avatar" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <h1 className="text-lg font-semibold">
                {selected_wallet?.wallet_name || "Account"}
              </h1>
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            className="min-w-[320px]"
            align="center"
            sideOffset={8}
          >
            <WalletTooltipInfo wallet={selected_wallet?.data} />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  const renderTokenItem = () => {
    return (
      <div className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-lg bg-muted p-4 cursor-pointer hover:bg-zinc-200 transition">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder-user.jpg" alt="Bitcoin" />
            <AvatarFallback className="bg-zinc-300 hover:bg-zinc-300">
              B
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">Bitcoin</div>
            <div className="text-sm text-muted-foreground">2 BTC</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-right">
          <div>
            <div className="font-medium">$7,500</div>
          </div>
          <ChevronRightIcon className="h-4 w-4" />
        </div>
      </div>
    );
  };

  const renderCollectibleItem = () => {
    return (
      <Image
        src={"https://picsum.photos/300/300"}
        alt=""
        width={300}
        height={300}
        className="rounded-lg"
      />
    );
  };

  const renderTabs = () => {
    return (
      <Tabs defaultValue="portfolio" className="w-full pt-8 pb-2">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="collectibles">Collectibles</TabsTrigger>
          <TabsTrigger value="recent_activity">Recent Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="portfolio">{renderPortfolio()}</TabsContent>
        <TabsContent value="collectibles">{renderCollectibles()}</TabsContent>
        <TabsContent value="recent_activity">
          {renderRecentActivity()}
        </TabsContent>
      </Tabs>
    );
  };

  const renderPortfolio = () => {
    return (
      <div className="grid gap-2">
        {renderTokenItem()}
        {renderTokenItem()}
        {renderTokenItem()}
        {renderTokenItem()}
      </div>
    );
  };
  const renderRecentActivity = () => {
    return (
      <div className="grid gap-2">
        {renderTokenItem()}
        {renderTokenItem()}
        {renderTokenItem()}
        {renderTokenItem()}
      </div>
    );
  };
  const renderCollectibles = () => {
    return (
      <div className="grid gap-2 grid-cols-3">
        {renderCollectibleItem()}
        {renderCollectibleItem()}
        {renderCollectibleItem()}
        {renderCollectibleItem()}
        {renderCollectibleItem()}
        {renderCollectibleItem()}
      </div>
    );
  };
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <WalletSideBar
        setSelectedWallet={setSelectedWallet}
        selected_wallet={selected_wallet}
      />
      <div className="w-full">
        <header className=" flex h-16 items-center justify-center gap-4 border-b bg-background px-4 sm:px-6">
          {renderHeader()}
        </header>
        <main className="flex-1 p-4 sm:p-6">
          <div className="grid gap-6">
            <div className="py-6 flex justify-center items-center">
              <p className="text-5xl font-bold ">$ 24.45</p>
            </div>

            <div className="grid">
              <div className="flex items-center justify-between gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-16 w-full rounded-lg bg-muted hover:bg-zinc-200 transition"
                >
                  <Plus className="h-6 w-6" color="#374151" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-16 w-full rounded-lg bg-muted hover:bg-zinc-200 transition"
                >
                  <Send className="h-6 w-6" color="#374151" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-16 w-full rounded-lg bg-muted hover:bg-zinc-200 transition"
                >
                  <ArrowLeftRight className="h-6 w-6" color="#374151" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-16 w-full rounded-lg bg-muted hover:bg-zinc-200 transition"
                >
                  <DollarSign className="h-6 w-6" color="#374151" />
                </Button>
              </div>
              {renderTabs()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
