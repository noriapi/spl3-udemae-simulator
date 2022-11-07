import { batch, createSignal } from "solid-js";
import { UdemaeSystem } from ".";
import { Task } from "./task";
import { Cmd, Msg } from "./worker";
import produce from "immer";
import { divideToArray } from "../utils";

export type Status = "idle" | "running" | "result";

const createSimulator = () => {
  let workers: Worker[] = [];
  const [status, setStatus] = createSignal<Status>("idle");
  const [results, setResults] = createSignal<UdemaeSystem[]>([]);
  const [parameter, setParameter] = createSignal<undefined | Cmd>();
  const [startTime, setStartTime] = createSignal<undefined | number>();
  const [lastTime, setLastTime] = createSignal<undefined | number>();

  const initialize = () => {
    workers.forEach((worker) => {
      worker.terminate();
    });

    batch(() => {
      setStatus("idle");
      setResults([]);
      setParameter();
      setStartTime();
      setLastTime();
    });
  };

  const start = (task: Task, simulators: number, workersNumber: number = 1) => {
    initialize();

    workers = divideToArray(simulators, workersNumber).map((tasks) => {
      const w = new Worker(new URL("./worker.ts", import.meta.url), {
        type: "module",
      });

      w.onmessage = (e: MessageEvent<Msg>) => {
        const newResults = produce(results(), (draft) => {
          draft.push(e.data);
        });

        batch(() => {
          if (newResults.length === parameter()?.tasks) {
            setStatus("result");
            setLastTime(performance.now() - (startTime() ?? 0));
          }
          setResults(newResults);
        });
      };

      w.postMessage({ task, tasks });

      return w;
    });

    batch(() => {
      setStatus("running");
      setStartTime(performance.now());
      setParameter({ task, tasks: simulators });
    });
  };

  return {
    status,
    results,
    parameter,
    start,
    lastTime,
  };
};

export default createSimulator;
