import React from "react";
import TokenItem from "./TokenItem";

const PortfolioSection = (props) => {
  //TODO: Fetch all portfolio data
  const {loading, sol_value, eth_value} = props;

  return (
    <div className="grid gap-2">
      <TokenItem loading={loading} name="Solana" ticker="SOL" balance={sol_value}/>
      <TokenItem loading={loading} name="Ethereum" ticker="ETH" balance={eth_value}/>
    </div>
  );
};

export default PortfolioSection;
