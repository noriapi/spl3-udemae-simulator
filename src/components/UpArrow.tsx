import { Component, JSX, JSXElement } from "solid-js";

export interface UpArrowProps {
  svgProps?: JSX.SvgSVGAttributes<SVGSVGElement>;
  polygonProps?: JSX.PolygonSVGAttributes<SVGPolygonElement>;
  children?: JSXElement;
}

const UpArrow: Component<UpArrowProps> = (props) => {
  return (
    <svg viewBox="0 0 100 100" width="1.4rem" {...props.svgProps}>
      <polygon
        points="50, 5 5, 60 30, 65 30, 95 70, 95 70, 65 95, 60"
        stroke-width="10"
        stroke-linejoin="round"
        {...props.polygonProps}
      />
      {props.children}
    </svg>
  );
};

export default UpArrow;
