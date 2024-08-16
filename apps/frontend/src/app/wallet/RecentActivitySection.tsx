import React from "react";
import RecentActivityItem from "./RecentActivityItem";

const RecentActivitySection = () => {
  return (
    <div className="grid gap-2">
      <RecentActivityItem />
      <RecentActivityItem />
      <RecentActivityItem />
    </div>
  );
};

export default RecentActivitySection;
