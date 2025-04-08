import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="w-full space-y-6 p-4">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 bg-primary/10 rounded-md animate-pulse"></div>
        <div className="h-8 w-24 bg-primary/10 rounded-md animate-pulse"></div>
      </div>

      {/* Main Content Skeleton */}
      <div className="space-y-4">
        {/* Recording Section */}
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 animate-pulse"></div>
          <div className="h-8 w-32 bg-primary/10 rounded-md animate-pulse"></div>
        </div>

        {/* Waveform Skeleton */}
        <div className="h-24 w-full bg-primary/10 rounded-lg animate-pulse"></div>

        {/* Transcript Section */}
        <div className="space-y-2">
          <div className="h-4 w-3/4 bg-primary/10 rounded animate-pulse"></div>
          <div className="h-4 w-5/6 bg-primary/10 rounded animate-pulse"></div>
          <div className="h-4 w-2/3 bg-primary/10 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
