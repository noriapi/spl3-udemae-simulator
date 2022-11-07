import { UdemaeSystem } from ".";

type Status = "idle" | "running" | "result";

interface Simulator {
  status: Status;
  results: UdemaeSystem[];
}
