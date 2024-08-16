import Image from "next/image";
import React from "react";

const CollectibleItem = () => {
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

export default CollectibleItem;
