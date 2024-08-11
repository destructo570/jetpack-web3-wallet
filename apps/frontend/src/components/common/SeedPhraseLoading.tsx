import React from "react";
import Skeleton from "react-loading-skeleton";

const SeedPhraseLoading = () => {
  const renderLoader = () => {
    let element_list = [];
    for (let index = 0; index < 12; index++) {
      element_list.push(<Skeleton width={256} height={32} />);
    }
    return element_list;
  };
  return <>{renderLoader()}</>;
};

export default SeedPhraseLoading;
