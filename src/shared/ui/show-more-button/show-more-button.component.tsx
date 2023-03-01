import * as React from "react";

export interface IShowMoreProps {
  showMore: boolean;
  onClick: () => void;
}

export function ShowMore(props: IShowMoreProps) {
  const { onClick, showMore } = props;
  return (
    <button
      onClick={onClick}
      className="text-black/60 font-rounded font-normal flex items-center"
    >
      show {showMore ? "less" : "all"}{" "}
      <span className="font-icon ml-1 text-lg">
        {showMore ? "chevron_left" : "chevron_right"}
      </span>
    </button>
  );
}
