import { Component, JSX, Show, splitProps } from "solid-js";
import UpArrow from "../UpArrow";

export interface LoseIconProps extends JSX.SvgSVGAttributes<SVGSVGElement> {
  lose?: boolean;
}

const LoseIcon: Component<LoseIconProps> = (props) => {
  const [local, svg] = splitProps(props, ["lose"]);

  return (
    <UpArrow
      svgProps={svg}
      polygonProps={{
        fill: local.lose ? "rgb(74, 36, 25)" : "rgb(247, 117, 3)",
        stroke: "0",
      }}
    >
      <Show when={local.lose}>
        <line x1="10" y1="10" x2="90" y2="90" stroke="gray" stroke-width="5" />
        <line x1="90" y1="10" x2="10" y2="90" stroke="gray" stroke-width="5" />
      </Show>
    </UpArrow>
  );
};

export default LoseIcon;
