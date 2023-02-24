import * as React from "react";

export interface IUserStatisticProperties {
  count: number;
  label: string;
}

export function UserStatistic(props: IUserStatisticProperties) {
  const { count, label } = props;

  return (
    <div className="flex items-center">
      <span className="text-2xl mr-2 text-black font-semibold font-rounded">
        {count}
      </span>
      <span className="text-base text-black/40 font-rounded font-semibold">
        {label}
      </span>
    </div>
  );
}
