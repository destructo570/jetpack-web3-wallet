"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import WalletSideBar from "./WalletSideBar";
import { useEffect, useState } from "react";
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
import { Settings } from "lucide-react";
import { JetPackWallet } from "@/model/JetPackWallet";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import { ethers, formatUnits } from "ethers";

export default function Component() {
  const [selected_wallet, setSelectedWallet] = useState<JetPackWallet>();
  const [loading, setLoading] = useState(false);
  const [loading_eth, setLoadingEth] = useState(false);
  const [wallet_data, setWalletData] = useState({
    sol_balance: 0,
    eth_balance: 0,
  });

  useEffect(() => {
    if (selected_wallet?.solana_wallet) {
      fetchWalletBalance();
      fetchEthWalletBalance();
    }
  }, [selected_wallet]);

  const fetchWalletBalance = async () => {
    setLoading(true);
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const walletBalance = await connection.getBalance(
      selected_wallet?.getSolanaWallet()?.getPublicKeyObj()!
    );
    setWalletData((prev) => ({
      ...prev,
      sol_balance: walletBalance / LAMPORTS_PER_SOL,
    }));
    setLoading(false);
  };
  
  const fetchEthWalletBalance = async () => {
    setLoadingEth(true);
    let provider = ethers.getDefaultProvider("sepolia");
    const balance = await provider.getBalance(
      selected_wallet?.getEthereumWallet()?.getPublicKey()
    );
    setWalletData((prev) => ({
      ...prev,
      eth_balance: formatUnits(balance),
    }));
    setLoadingEth(false);
  };

  const renderHeader = () => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center justify-center gap-4 cursor-default w-full">
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
            <WalletTooltipInfo wallet={selected_wallet} />
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
        <header className=" flex h-16 items-center justify-center gap-4 border-b bg-background">
          <div className="flex items-center w-full">
            {renderHeader()}
            <div className="hover:bg-zinc-700 p-2 rounded-lg cursor-pointer">
              <Settings size={24} color="#A1A1A1" />
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">
          <div className="grid gap-6">
            <div className="py-6 flex justify-center items-center">
              {loading ? (
                <SkeletonLoader height={48} width={200} />
              ) : (
                <p className="text-5xl font-bold ">$ 0.0</p>
              )}
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
                  <PortfolioSection
                    loading={loading || loading_eth}
                    sol_value={wallet_data?.sol_balance}
                    eth_value={wallet_data?.eth_balance}
                  />
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
