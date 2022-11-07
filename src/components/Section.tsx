import { Component, JSX } from "solid-js";

const Section: Component<JSX.HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div {...props}>
      <h5 class="font-semibold">{props.title}</h5>
      {props.children}
    </div>
  );
};

export default Section;
