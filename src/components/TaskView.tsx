import BigNumber from "bignumber.js";
import { Component, Show } from "solid-js";
import { Norma, Task } from "../udemae-system/task";
import { toString } from "../udemae-system/udemae-name";

interface NormaViewProps {
  norma: Norma;
}

const NormaView: Component<NormaViewProps> = (props) => {
  return (
    <>
      <Show when={props.norma.battles != null}>
        <span>{`${props.norma.battles}試合`}</span>
        <span>行う</span>
      </Show>

      <Show when={props.norma.battles != null && props.norma.udemae != null}>
        <span>か、</span>
      </Show>

      <Show when={props.norma.udemae} keyed>
        {(udemae) => (
          <>
            <span>{`ウデマエ ${toString(udemae.name)} ${udemae.point}p`}</span>
            <span>に到達する</span>
          </>
        )}
      </Show>

      <span>まで</span>
    </>
  );
};

interface TaskViewProps {
  task: Task;
}

const TaskView: Component<TaskViewProps> = (props) => {
  const winRatioInPercent = () =>
    new BigNumber(props.task.player.winRatio).times(100).toNumber();

  const goldRatioInPercent = () =>
    new BigNumber(props.task.player.commsRatio[0]).times(100).toNumber();

  const silverRatioInPercent = () =>
    new BigNumber(props.task.player.commsRatio[1]).times(100).toNumber();

  return (
    <ul class="list-disc list-inside">
      <li class="m-1">
        <span>開始ウデマエ: </span>
        <span>
          <span>{toString(props.task.udemae.udemae.name)}</span>
          <span> </span>
          <span>{props.task.udemae.udemae.point}</span>
          <span>p</span>
        </span>
      </li>

      <li class="m-1">
        <span>勝率: </span>
        <span>{`${winRatioInPercent()}%`}</span>
      </li>

      <li class="m-1">
        <span>金表彰を獲得する確率: </span>
        <span>{`${goldRatioInPercent()}%`}</span>
      </li>

      <li class="m-1">
        <span>銀表彰を獲得する確率: </span>
        <span>{`${silverRatioInPercent()}%`}</span>
      </li>

      <li class="m-1">
        <span>終了条件: </span>
        <span>
          <NormaView norma={props.task.norma} />
        </span>
      </li>
    </ul>
  );
};

export default TaskView;
