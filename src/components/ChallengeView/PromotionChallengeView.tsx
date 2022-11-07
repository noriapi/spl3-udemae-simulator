import { Component, For, Show } from "solid-js";
import * as PC from "../../udemae-system/challenge/promotion-challenge";
import * as R from "../../udemae-system/challenge/results";
import ChallengingView from "./ChallengingView";
import FinishView from "./FinishView";

interface ResultViewProps {
  win: boolean;
}

const ResultView: Component<ResultViewProps> = (props) => {
  return (
    <div class="bg-neutral-700 inline-flex px-1 w-34 justify-center items-center">
      <Show
        when={props.win}
        fallback={<span class="text-blue font-extrabold">LOSE</span>}
      >
        <span class="text-yellow font-extrabold">WIN</span>
      </Show>
    </div>
  );
};

interface FinishViewAProps {
  promote: boolean;
  results: R.Results;
}

const FinishViewA: Component<FinishViewAProps> = (props) => {
  const winLose = () => R.winLose(props.results);

  return (
    <FinishView message={props.promote ? "昇格おめでとう!!" : "挑戦終了!"}>
      <div class="flex-auto flex flex-col justify-around">
        <div class="text-4xl mb-2 font-extrabold text-center">
          <span>{winLose().wins}</span>
          <span class="mx-2">-</span>
          <span>{winLose().loses}</span>
        </div>

        <div
          class="grid gap-x-2 gap-y-0.5 place-content-center"
          classList={{
            "grid-cols-[repeat(3,min-content)]": props.results.length !== 4,
            "grid-cols-[repeat(2,min-content)]": props.results.length === 4,
          }}
        >
          <For each={props.results}>
            {(result) => <ResultView win={result.win} />}
          </For>
        </div>
      </div>
    </FinishView>
  );
};

export interface PromotionChallengeViewProps {
  challenge: PC.PromotionChallenge;
}

const PromotionChallengeView: Component<PromotionChallengeViewProps> = (
  props
) => {
  const promote = () => PC.result(props.challenge);

  return (
    <Show
      when={
        typeof promote() !== "undefined" && {
          promote: promote()!,
          results: props.challenge.results,
        }
      }
      fallback={
        <ChallengingView
          results={props.challenge.results}
          winsLimit={3}
          losesLimit={3}
        />
      }
      keyed
    >
      {(props) => <FinishViewA {...props} />}
    </Show>
  );
};

export default PromotionChallengeView;
