import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import * as React from "react";
import { IAction } from "../model";
import { ActionCard } from "./action-card.component";

export interface IActionListProps {
  actions: IAction[];
}

export function ActionList(props: IActionListProps) {
  const { actions } = props;

  const matches = useMediaQuery("(max-width: 768px)");

  return (
    <Carousel
      // onSlideChange={(index) => setChosedImage(index)}
      dragFree={true}
      slideGap={!matches? 16 : 48}
      draggable
      classNames={{
        controls: "hidden",
        // control: "bg-white",
        viewport: "pl-4",
      }}
      slideSize={!matches ? "45%" : "70%"}
      loop={!matches}
      align={"start"}
    >
      {actions.map((action, index) => {
        return (
          <Carousel.Slide key={index}>
            <ActionCard {...action} />
          </Carousel.Slide>
        );
      })}
    </Carousel>
  );
}
