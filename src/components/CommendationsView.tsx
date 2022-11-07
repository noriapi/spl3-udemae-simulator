import { Component, For } from "solid-js";
import { Commendations, flat } from "../udemae-system/commendation";
import CommendationIcon from "./CommendationIcon";

interface CommendationsViewProps {
  comms: Commendations;
}

const CommendationsView: Component<CommendationsViewProps> = (props) => {
  return (
    <For each={flat(props.comms)}>
      {(comm) => <CommendationIcon comm={comm} />}
    </For>
  );
};

export default CommendationsView;
