"use client";
import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonLoader = (props) => {
  return (
    <Skeleton {...props} baseColor={"#52525B"} highlightColor={"#6d6d75"} />
  );
};

export default SkeletonLoader;
