"use client";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PrimaryActions from "./PrimaryActions";
import PortfolioSection from "./PortfolioSection";
import CollectiblesSection from "./CollectiblesSection";
import RecentActivitySection from "./RecentActivitySection";

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
              <PrimaryActions />
              <Tabs defaultValue="portfolio" className="w-full pt-12 pb-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                  <TabsTrigger value="collectibles">Collectibles</TabsTrigger>
                  <TabsTrigger value="recent_activity">
                    Recent Activity
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="portfolio" className="mt-6">
                  <PortfolioSection />
                </TabsContent>
                <TabsContent value="collectibles" className="mt-6">
                  <CollectiblesSection />
                </TabsContent>
                <TabsContent value="recent_activity" className="mt-6">
                  <RecentActivitySection />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
