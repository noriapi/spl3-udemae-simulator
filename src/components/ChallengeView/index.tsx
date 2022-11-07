import { Component, Match, Switch } from "solid-js";
import { Challenge } from "../../udemae-system/challenge";
import { UdemaeName } from "../../udemae-system/udemae-name";
import NormalChallengeView from "./NormalChallengeView";
import PromotionChallengeView from "./PromotionChallengeView";

export interface ChallengeViewProps {
  challenge: Challenge;
  name: UdemaeName;
}

const ChallengeView: Component<ChallengeViewProps> = (props) => {
  return (
    <Switch>
      <Match when={props.challenge.tag === "Normal" && props.challenge} keyed>
        {(c) => <NormalChallengeView challenge={c} name={props.name} />}
      </Match>

      <Match
        when={props.challenge.tag === "Promotion" && props.challenge}
        keyed
      >
        {(c) => <PromotionChallengeView challenge={c} />}
      </Match>
    </Switch>
  );
};

export default ChallengeView;
