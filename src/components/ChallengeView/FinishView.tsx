import { ParentComponent } from "solid-js";

export interface FinishViewProps {
  message: string;
}

const FinishView: ParentComponent<FinishViewProps> = (props) => {
  return (
    <div class="flex-auto flex flex-col">
      <p class="text-center ">{props.message}</p>

      {props.children}
    </div>
  );
};

export default FinishView;
