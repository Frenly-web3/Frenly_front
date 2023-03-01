import { clsx } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Paper, ShowMore } from "@shared/ui";
import * as React from "react";

export interface ITokensPaperProps {
  title: string;
  maxRows: number;
  className?: string;
}
const mockTokens = [
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
];
export function TokensPaper(props: ITokensPaperProps) {
  const { title, maxRows, className } = props;

  const [showedMore, setShowedMore] = React.useState(false);
  const matches = useMediaQuery("(max-width: 768px)");

  return (
    <Paper className={clsx("rounded-[2rem]", className)}>
      <div className="flex justify-between mb-4">
        <h4 className="text-black font-rounded font-bold text-2xl">{title}</h4>
        <ShowMore
          onClick={() => setShowedMore((prev) => !prev)}
          showMore={showedMore}
        />
      </div>
      <div className={"grid md:grid-cols-4 grid-cols-3 gap-2"}>
        {showedMore
          ? mockTokens.map((token, index) => {
              return (
                <div className="w-full aspect-square animate-pulse rounded-2xl bg-black/5"></div>
              );
            })
          : mockTokens
              .slice(0, maxRows * (matches ? 3 : 4))
              .map((token, index) => {
                return (
                  <div className="w-full aspect-square animate-pulse rounded-2xl bg-black/5"></div>
                );
              })}
      </div>
    </Paper>
  );
}
