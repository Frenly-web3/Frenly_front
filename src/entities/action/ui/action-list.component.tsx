import { Carousel, Embla } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import * as React from "react";
import { IAction } from "../model";
import { ActionCard } from "./action-card.component";

export interface IActionListProps {
  actions: IAction[];
}

export function ActionList(props: IActionListProps) {
  const { actions } = props;
  const [embla, setEmbla] = React.useState<Embla | null>(null);
  const matches = useMediaQuery("(max-width: 768px)");

  React.useEffect(() => {
    embla?.reInit();
  }, [actions]);

  return (
    <Carousel
      // onSlideChange={(index) => setChosedImage(index)}
      dragFree
      containScroll={"trimSnaps"}
      slideGap={!matches ? 16 : 48}
      draggable
      getEmblaApi={setEmbla}
      withKeyboardEvents
      classNames={{
        controls: "hidden",
        viewport: "px-4 w-full",
      }}
      slideSize={!matches ? "45%" : "75%"}
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
