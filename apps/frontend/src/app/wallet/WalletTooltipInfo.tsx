import { copyToClipboard } from "@/lib/helpers";
import { JetPackWallet } from "@/model/JetPackWallet";
import { Copy } from "lucide-react";
import React from "react";



const WalletTooltipInfo = (props: {wallet: JetPackWallet | undefined}) => {
  const { wallet } = props;
  
  let sol_public_key = wallet?.getSolanaPublicKey();
  let eth_public_key = wallet?.getEthereumPublicKey();
  // let btc_public_key = wallet?.[NETWORK.BITCOIN]?.publicKey;
  
  let key = wallet?.getEthereumWallet()?.getPrivateKeyFromSeed("art attend trend exercise run develop diagram donkey raven october logic vote");
  
  return (
    <div>
      <div className="flex gap-2 justify-between">
        <p className="text-base">Solana:</p>
        <div className="max-w-[200px] flex gap-2 justify-between items-center">
          <p className="truncate text-base">{sol_public_key}</p>
          <Copy
            size={16}
            className="min-w-[24px] cursor-pointer"
            onClick={(e) => {
              e?.stopPropagation();
              copyToClipboard(sol_public_key);
            }}
          />
        </div>
      </div>
      <div className="flex gap-2  justify-between">
        <p className="text-base">Ethereum:</p>
        <div className="max-w-[200px] flex gap-2 justify-between items-center">
          <p className="truncate text-base">{eth_public_key}</p>
          <Copy
            size={16}
            className="min-w-[24px] cursor-pointer"
            onClick={(e) => {
              e?.stopPropagation();
              copyToClipboard(eth_public_key);
            }}
          />
        </div>
      </div>
      {/* <div className="flex gap-2  justify-between">
        <p className="text-base">Bitcoin:</p>
        <div className="max-w-[200px] flex gap-2 justify-between items-center">
          <p className="truncate text-base">{btc_public_key}</p>
          <Copy
            size={16}
            className="min-w-[24px] cursor-pointer"
            onClick={(e) => {
              e?.stopPropagation();
              copyToClipboard(btc_public_key);
            }}
          />
        </div>
      </div> */}
    </div>
  );
};

export default WalletTooltipInfo;
