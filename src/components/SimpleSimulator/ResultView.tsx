import { Component } from "solid-js";
import { Result } from "../../udemae-system/player";
import CommendationsView from "../CommendationsView";

export interface ResultViewProps {
  result: Result;
}

const ResultView: Component<ResultViewProps> = (props) => {
  return (
    <>
      <div class="text-3xl font-bold mb-1">
        {props.result.win ? "WIN!" : "LOSE..."}
      </div>
      <div class="align-middle">
        表彰:
        <CommendationsView comms={props.result.comms} />
      </div>
    </>
  );
};

export default ResultView;
