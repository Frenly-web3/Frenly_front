import * as React from "react";
import { IAction } from "../model";
import { SmallAction } from "./small-action.component";

export interface ISmallActionListProps {
  actions: IAction[];
}

export function SmallActionList(props: ISmallActionListProps) {
  const { actions } = props;

  return (
    <div className="flex flex-col p-4 border-black/20 border-2 rounded-[2rem]">
      {actions.map((action) => {
        return (
          <div className="mb-4">
            <SmallAction {...action} />
          </div>
        );
      })}
    </div>
  );
}
