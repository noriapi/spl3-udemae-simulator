import { Component, For, Show } from "solid-js";
import * as NC from "../../udemae-system/challenge/normal-challenge";
import * as R from "../../udemae-system/challenge/results";
import { UdemaePoint } from "../../udemae-system/udemae-point";
import { UdemaeRank } from "../../udemae-system/udemae-rank";
import ResultView from "./ResultView";
import ChallengingView from "./ChallengingView";
import FinishView from "./FinishView";
import { UdemaeName } from "../../udemae-system/udemae-name";

// challenge finish
interface FinishViewAProps {
  results: R.Results;
  reward: UdemaePoint;
}

const FinishViewA: Component<FinishViewAProps> = (props) => {
  return (
    <FinishView message="挑戦終了!">
      <div class="flex-auto flex justify-center items-center gap-x-2">
        <div
          class="inline-grid grid-flow-col gap-x-1.5 gap-y-0.5 w-min"
          classList={{
            "grid-rows-3": props.results.length < 7,
            "grid-rows-4": props.results.length >= 7,
          }}
        >
          <For each={props.results}>
            {(result) => <ResultView result={result} />}
          </For>
        </div>

        <div class="inline-block text-6xl text-neutral-500">=</div>
        <div class="inline-block text-center">
          <span class="block text-md text-neutral-500">TOTAL</span>
          <span class="block text-6xl font-bold">{`${props.reward}p`}</span>
        </div>
      </div>
    </FinishView>
  );
};

export interface NormalChallengeViewProps {
  challenge: NC.NormalChallenge;
  name: UdemaeName;
}

const NormalChallengeView: Component<NormalChallengeViewProps> = (props) => {
  const reward = () => NC.reward(props.challenge, props.name);

  return (
    <Show
      when={
        typeof reward() !== "undefined" && {
          reward: reward()!,
          results: props.challenge.results,
        }
      }
      fallback={
        <ChallengingView
          results={props.challenge.results}
          winsLimit={5}
          losesLimit={3}
        />
      }
      keyed
    >
      {(props) => <FinishViewA {...props} />}
    </Show>
  );
};

export default NormalChallengeView;
