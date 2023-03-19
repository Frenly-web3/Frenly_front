import { CommunitySingle } from "@widgets/community";
import { SuggestedFriends } from "@widgets/suggested-friends";
import * as React from "react";

export interface IRightSectionProps {
  id?: string;
}

export function RightSection(props: IRightSectionProps) {
  return (
    <div className="sticky top-[5.5rem] max-lg:hidden">
      <CommunitySingle {...props} />
      <div className="mt-4">
        <SuggestedFriends />
      </div>
    </div>
  );
}
