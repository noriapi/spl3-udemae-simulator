import { UdemaeSystem } from ".";
import * as T from "./task";
import { Msg } from "./worker";
import { v4 as uuidv4 } from "uuid";

interface Work {
  task: T.Task;
  tasks: number;
  worker: Worker;
  results: UdemaeSystem[];
}

const works: Map<string, Work> = new Map();

export interface StartCmd {
  tag: "start";
  task: T.Task;
  tasks: number;
}

const startTask = (cmd: StartCmd): string => {
  const id = uuidv4();

  const work: Work = {
    task: cmd.task,
    tasks: cmd.tasks,
    worker: new Worker(new URL("./worker.ts", import.meta.url), {
      type: "module",
    }),
    results: [],
  };

  work.worker.onmessage = (e: MessageEvent<Msg>) => {
    work.results.push(e.data);
  };

  works.set(id, work);

  return id;
};

export interface FetchCmd {
  tag: "fetch";
  id: string;
}

const fetch = (cmd: FetchCmd) => {
  const work = works.get(cmd.id);

  const result = work && {
    task: work.task,
    tasks: work.tasks,
    results: work.results,
  };

  return result;
};

export type Cmd = StartCmd | FetchCmd;

const handleMessage = (e: MessageEvent<Cmd>) => {
  const data = e.data;

  switch (data.tag) {
    case "start":
      startTask(data);
      break;
    case "fetch":
      fetch(data);
      break;
  }
};

onmessage = handleMessage;
