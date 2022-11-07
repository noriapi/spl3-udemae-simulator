import { Component } from "solid-js";
import * as R from "../../udemae-system/challenge/results";
import WinLoseView from "../WinLose";
import WinLoseIcons from "../WinLoseIcons";

interface ChallengingViewProps {
  results: R.Results;
  winsLimit: number;
  losesLimit: number;
}

const ChallengingView: Component<ChallengingViewProps> = (props) => {
  const winLose = () => R.winLose(props.results);

  return (
    <div class="flex-auto flex flex-col justify-around">
      <div class="">
        <WinLoseView wins={winLose().wins} loses={winLose().loses} />
      </div>

      <WinLoseIcons
        wins={winLose().wins}
        loses={winLose().loses}
        winsLimit={props.winsLimit}
        losesLimit={props.losesLimit}
      />
    </div>
  );
};

export default ChallengingView;
