import { batch, Component, createSignal, Match, Switch } from "solid-js";
import produce from "immer";
import { Task } from "../udemae-system/task";
import MultiSimulatorInputs from "./MultiSimulatorInputs";
import type { Cmd } from "../udemae-system/worker";
import { UdemaeSystem } from "../udemae-system";
import MultiSimulatorOutput from "./MultiSimulatorOutput";
import { Status } from "../udemae-system/create-simulator";
import BigNumber from "bignumber.js";
import TaskView from "./TaskView";
import Section from "./Section";

interface MultiSimulatorProps {
  status: Status;
  results: UdemaeSystem[];
  parameter?: Cmd;
  startTime?: number;
  lastTime?: number;
  start: (task: Task, simulators: number, workersNumber?: number) => void;
}

const MultiSimulator: Component<MultiSimulatorProps> = (props) => {
  const lastTimeInSec = () =>
    new BigNumber(props.lastTime ?? 0).div(1000).toNumber();

  return (
    <Switch>
      <Match when={props.status === "idle"}>
        <MultiSimulatorInputs onSubmit={props.start} />
      </Match>
      <Match when={props.status === "running"}>
        <div class="p-2">
          <Section title="パラメータ" class="box">
            <TaskView task={props.parameter!.task} />
          </Section>

          <div class="p-2">
            <p>
              <span>計算中...</span>
              <span> </span>
              <span>{`(${props.results.length} / ${
                props.parameter!.tasks
              })`}</span>
            </p>
          </div>
        </div>
      </Match>
      <Match when={props.status === "result"}>
        <div class="p-2">
          <div class="border p-2">
            <h4 class="text-lg mb-1">パラメータ</h4>
            <div class="m-1">
              <TaskView task={props.parameter!.task} />
            </div>
          </div>

          <div class="p-2">
            <p>
              計測終了
              <span>{`(${lastTimeInSec()} 秒)`}</span>
            </p>
            <MultiSimulatorOutput
              results={props.results}
              parameter={props.parameter!}
            />
          </div>
        </div>
      </Match>
    </Switch>
  );
};

export default MultiSimulator;
