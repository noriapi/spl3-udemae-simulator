import { UdemaeSystem } from ".";
import * as T from "./task";

export interface Cmd {
  task: T.Task;
  tasks: number;
}

export type Msg = UdemaeSystem;

const startTask = (cmd: Cmd) => {
  for (let i = 0; i < cmd.tasks; i++) {
    const result: Msg = T.run(cmd.task);

    postMessage(result);
  }
};

const handleMessage = (e: MessageEvent<Cmd>) => {
  const data: Cmd = e.data;
  startTask(data);
};

onmessage = handleMessage;
