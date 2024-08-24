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
import SkeletonLoader from "@/components/common/SkeletonLoader";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SettingsDialog from "@/components/Settings/SettingsDialog";
import { getEthBalance, getSolanaBalance } from "../api/actions";

interface WalletData{
  sol_balance: bigint | number | string,
  eth_balance: bigint | number | string,
}

export default function Component() {
  const [selected_wallet, setSelectedWallet] = useState<JetPackWallet>();
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading_eth, setLoadingEth] = useState(false);
  const [wallet_data, setWalletData] = useState<WalletData>({
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
    let public_key = selected_wallet?.getSolanaWallet()?.getPublicKey();
    
    if(!public_key) return;
    
    const res = await getSolanaBalance({ public_key, network_type: "devnet" });
    setWalletData((prev) => ({
      ...prev,
      sol_balance: JetPackWallet.convertLamportsToSol(res?.data?.value),
    }));
    setLoading(false);
  };

  const fetchEthWalletBalance = async () => {
    setLoadingEth(true);
    let public_key = selected_wallet?.getEthereumWallet()?.getPublicKey();
    
    if(!public_key) return;

    const res = await getEthBalance({ public_key, network_type: "sepolia"  });
    setWalletData((prev) => ({
      ...prev,
      eth_balance: JetPackWallet.convertHexToEth(res?.data?.result),
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

  const renderSettings = () => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <div className="hover:bg-zinc-700 p-2 rounded-lg cursor-pointer">
            <Settings size={24} color="#A1A1A1" />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          <SettingsDialog wallets={wallets} />
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <WalletSideBar
        setSelectedWallet={setSelectedWallet}
        selected_wallet={selected_wallet}
        wallets={wallets}
        setWallets={setWallets}
      />
      <div className="w-full">
        <header className=" flex h-16 items-center justify-center gap-4 border-b bg-background">
          <div className="flex items-center w-full">
            {renderHeader()}
            {renderSettings()}
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
              <PrimaryActions
                wallet={selected_wallet}
                fetchWalletBalance={fetchWalletBalance}
              />
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
                  <CollectiblesSection wallet={selected_wallet}/>
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
