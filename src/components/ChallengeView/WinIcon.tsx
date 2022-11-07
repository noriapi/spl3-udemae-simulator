import { Component, JSX, Show, splitProps } from "solid-js";

export interface WinIconProps extends JSX.SvgSVGAttributes<SVGSVGElement> {
  win?: boolean;
}

const WinIcon: Component<WinIconProps> = (props) => {
  const [local, svg] = splitProps(props, ["win"]);

  return (
    <svg viewBox="0 0 100 100" width="2rem" {...svg}>
      <Show
        when={local.win}
        fallback={
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke-dasharray="15"
            stroke="black"
            fill="transparent"
            stroke-width="5"
          />
        }
      >
        <circle cx="50" cy="50" r="50" fill="rgb(243,255,8)" />
        <text
          x="50"
          y="50"
          text-anchor="middle"
          dominant-baseline="central"
          font-size="35"
          font-weight="bold"
        >
          WIN
        </text>
      </Show>
    </svg>
  );
};

export default WinIcon;
