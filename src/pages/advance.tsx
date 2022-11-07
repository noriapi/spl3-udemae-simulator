import MultiSimulator from "../components/MultiSimulator";
import createSimulator from "../udemae-system/create-simulator";

export default function Advance() {
  const { status, results, parameter, start, lastTime } = createSimulator();
  return (
    <MultiSimulator
      status={status()}
      results={results()}
      parameter={parameter()}
      start={start}
      lastTime={lastTime()}
    />
  );
}
