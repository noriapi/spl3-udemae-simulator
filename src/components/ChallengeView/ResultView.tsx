import { Component, Show } from "solid-js";
import { Result } from "../../udemae-system/player";
import CommendationsView from "../CommendationsView";

export interface ResultViewProps {
  result: Result;
}

const ResultView: Component<ResultViewProps> = (props) => {
  return (
    <div class="bg-neutral-700 inline-flex px-1 w-34 justify-between items-center">
      <Show
        when={props.result.win}
        fallback={<span class="text-blue font-extrabold">LOSE</span>}
      >
        <span class="text-yellow font-extrabold">WIN</span>
      </Show>
      <div class="grid grid-cols-3">
        <CommendationsView comms={props.result.comms} />
      </div>
    </div>
  );
};

export default ResultView;
