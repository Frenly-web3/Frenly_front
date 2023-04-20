import { Affix, Transition } from "@mantine/core";
import { useMediaQuery, useWindowScroll } from "@mantine/hooks";
import * as React from "react";

export interface IScrollToTopProps {}

export function ScrollToTop(props: IScrollToTopProps) {
  const matches = useMediaQuery("(min-width: 768px)");
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <div>
      <Affix position={{ bottom: matches ? 10 : 100, right: 10 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <button
              className="rounded-full font-icon text-2xl w-12 text-lg aspect-square bg-white"
              // leftIcon={}
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
              expand_less
            </button>
          )}
        </Transition>
      </Affix>
    </div>
  );
}
