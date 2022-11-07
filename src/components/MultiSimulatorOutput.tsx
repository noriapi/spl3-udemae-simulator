import { Component, onMount } from "solid-js";
import { UdemaeSystem } from "../udemae-system";
import { Cmd } from "../udemae-system/worker";
import { Chart, registerables } from "chart.js";
import * as N from "../udemae-system/udemae-name";

Chart.register(...registerables);

export interface MultiSimulatorOutputProps {
  results: UdemaeSystem[];
  parameter: Cmd;
}

const labels = N.ALL_UDEMAE_NAME.map(N.toString);

const LABEL_IDX_MAP = Object.fromEntries(labels.map((label, i) => [label, i]));

const BACKGROUND_COLOR = "rgba(54, 162, 235, 0.2)";
const BORDER_COLOR = "rgb(54, 162, 235)";

const getData = (results: UdemaeSystem[]) => {
  const udemaeCounts = labels.map(() => 0);

  for (const result of results) {
    const label = N.toString(result.udemae.name);
    const idx = LABEL_IDX_MAP[label];
    udemaeCounts[idx]++;
  }

  return udemaeCounts;
};

const MultiSimulatorOutput: Component<MultiSimulatorOutputProps> = (props) => {
  let chartRef: HTMLCanvasElement | undefined;

  const data = {
    labels: labels,
    datasets: [
      {
        label: "そのウデマエに達した数",
        data: getData(props.results),
        borderWidth: 1,
        backgroundColor: BACKGROUND_COLOR,
        borderColor: BORDER_COLOR,
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  } as const;

  onMount(() => {
    if (!chartRef) return;

    const chart = new Chart(chartRef, config);
  });

  return (
    <div>
      <canvas id="simulation-result" ref={chartRef}></canvas>
    </div>
  );
};

export default MultiSimulatorOutput;
