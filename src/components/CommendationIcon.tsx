import { Component, Match, Switch } from "solid-js";
import { Commendation } from "../udemae-system/commendation";
import UpArrow from "./UpArrow";

export const GoldCommendation = () => {
  return (
    <UpArrow
      svgProps={{
        class: "inline-block m-0",
      }}
      polygonProps={{
        stroke: "rgb(244, 229, 191)",
        "stroke-width": "2px",
        fill: "url(#gold-gradient)",
      }}
    >
      <defs>
        <linearGradient id="gold-gradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="white" />
          <stop offset="100%" stop-color="yellow" />
        </linearGradient>
      </defs>
    </UpArrow>
  );
};

/* <div class="bg-gradient-to-b from-yellow-100 to-yellow-400 inline-block w-4 h-4 mx-0.5" /> */
export const SilverCommendation = () => {
  return (
    <UpArrow
      svgProps={{
        class: "inline-block",
      }}
      polygonProps={{
        stroke: "rgb(244, 229, 191)",
        "stroke-width": "2px",
        fill: "url(#silver-gradient)",
      }}
    >
      <defs>
        <linearGradient id="silver-gradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="white" />
          <stop offset="100%" stop-color="gray" />
        </linearGradient>
      </defs>
    </UpArrow>
  );
};

interface CommendationIconProps {
  comm: Commendation;
}

const CommendationIcon: Component<CommendationIconProps> = (props) => {
  return (
    <Switch>
      <Match when={props.comm === "gold"}>
        <GoldCommendation />
      </Match>

      <Match when={props.comm === "silver"}>
        <SilverCommendation />
      </Match>
    </Switch>
  );
};

export default CommendationIcon;
