import * as React from "react";

export function AuthorSkeleton() {
  return (
    <>
      {[1, 2, 3, 4].map(() => (
        <div className="flex gap-3 ">
          <div className="w-10 aspect-square rounded-full bg-black/10 animate-pulse"></div>
          <div className="w-32 h-4 bg-black/10 animate-pulse rounded-2xl mt-1"></div>
        </div>
      ))}
    </>
  );
}
