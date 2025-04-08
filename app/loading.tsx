import React from "react";
import LoadingSkeleton from "./components/atoms/LoadingSkeleton";

export default function Loading() {
  return (
    <div className="w-full min-h-screen">
      <LoadingSkeleton />
    </div>
  );
}
