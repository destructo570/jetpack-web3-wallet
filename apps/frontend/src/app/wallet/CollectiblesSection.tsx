import React, { useEffect, useState } from "react";
import CollectibleItem from "./CollectibleItem";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import { getSolanaNftsOwned } from "../api/actions";
import { JetPackWallet } from "@/model/JetPackWallet";
import { ImageOff, Search } from "lucide-react";

const CollectiblesSection = (props: { wallet: JetPackWallet }) => {
  const { wallet } = props;
  const [loading, setLoading] = useState(false);
  const [nft_list, setNftList] = useState([]);

  useEffect(() => {
    const fetchNfts = async () => {
      setLoading(true);
      const response = await getSolanaNftsOwned(wallet.getSolanaPublicKey());

      if (response && response?.data?.nfts) {
        setNftList(response?.data?.nfts || []);
      }
      setLoading(false);
    };
    fetchNfts();
  }, []);

  const renderLoader = () => {
    const elements = [];
    for (let index = 0; index < 12; index++) {
      elements.push(<SkeletonLoader width={150} height={150} />);
    }
    return <>{elements}</>;
  };

  const renderNoNft = () => {
    return (
      <div className="min-h-[300px] flex flex-col items-center justify-center">
        <div className=" flex flex-col items-center content-center h-full gap-4">
        <Search  size={64} color="#A1A1A1"/>
        <p>No NFT Found</p>
        </div>
      </div>
    );
  };

  return (
    <>
      {!nft_list?.length && !loading ? (
        <>
        {renderNoNft()}
        </>
      ) : (
        <div className="grid gap-2 grid-cols-3">
          {loading ? (
            renderLoader()
          ) : (
            <>
              {nft_list?.map((nft) => {
                if (!nft?.image_uri) return null;
                return <CollectibleItem nft={nft} />;
              })}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default CollectiblesSection;
