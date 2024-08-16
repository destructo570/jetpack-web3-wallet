import React from "react";
import CollectibleItem from "./CollectibleItem";

const CollectiblesSection = () => {
  return (
    <div className="grid gap-2 grid-cols-3">
      <CollectibleItem />
      <CollectibleItem />
      <CollectibleItem />
      <CollectibleItem />
      <CollectibleItem />
      <CollectibleItem />
    </div>
  );
};

export default CollectiblesSection;
