import { Component, Index } from "solid-js";
import LoseIcon from "./ChallengeView/LoseIcon";
import WinIcon from "./ChallengeView/WinIcon";

export interface WinLoseIconsProps {
  wins: number;
  loses: number;
  winsLimit: number;
  losesLimit: number;
}

const WinLoseIcons: Component<WinLoseIconsProps> = (props) => {
  return (
    <div class="w-max mx-auto">
      <div class="">
        <Index each={Array.from({ length: props.winsLimit })}>
          {(_, i) => (
            <WinIcon class="inline-block mx-0.5" win={props.wins >= i + 1} />
          )}
        </Index>
      </div>
      <div class="">
        <Index each={Array.from({ length: props.losesLimit })}>
          {(_, i) => (
            <LoseIcon
              class="inline-block mx-0.5"
              lose={props.loses >= props.losesLimit - i}
            />
          )}
        </Index>
      </div>
    </div>
  );
};

export default WinLoseIcons;
