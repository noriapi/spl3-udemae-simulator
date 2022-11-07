import { Component, createSignal } from "solid-js";
import * as P from "../udemae-system/player";
import { Udemae } from "../udemae-system/udemae";
import PlayerForm from "./PlayerForm";
import UdemaeInputs from "./UdemaeInputs";
import * as US from "../udemae-system";
import produce from "immer";
import TaskNormaInputs from "./TaskNormaInputs";
import { DEFAULT_NORMA, Norma, Task } from "../udemae-system/task";
import Section from "./Section";

export interface MultiSimulatorInputs {
  onSubmit: (task: Task, simulators: number, workers?: number) => void;
}

const MultiSimulatorInputs: Component<MultiSimulatorInputs> = (props) => {
  const [udemaeSystem, setUdemaeSystem] = createSignal(US.INITIAL);
  const udemae = () => udemaeSystem().udemae;
  const setUdemae = (udemae: Udemae) =>
    setUdemaeSystem((prev) =>
      produce<US.UdemaeSystem>(prev, (draft) => {
        draft.udemae = udemae;
      })
    );

  const [player, setPlayer] = createSignal(P.DEFAULT_PLAYER);
  const [norma, setNorma] = createSignal<Norma>(DEFAULT_NORMA);
  const [simulators, setSimulators] = createSignal(1000);

  return (
    <>
      <div class="border w-full p-2 my-4">
        <h3 class="text-xl font-bold mb-2">パラメータ</h3>

        <div class="columns-[540px]">
          <Section
            title="開始ウデマエ"
            class="box w-full break-inside-avoid m-2 inline-block box-border"
          >
            <div class="mt-2">
              <UdemaeInputs udemae={udemae()} onInput={setUdemae} />
            </div>
          </Section>

          <Section
            title="バトルの結果に関する確率"
            class="box w-full break-inside-avoid m-2 inline-block box-border"
          >
            <div class="mt-2">
              <PlayerForm player={player()} onInput={setPlayer} />
            </div>
          </Section>

          <Section
            title="各シミュレーションの終了条件"
            class="box w-full break-inside-avoid m-2 inline-block box-border"
          >
            <div class="mt-2">
              <TaskNormaInputs norma={norma()} onInput={setNorma} />
            </div>
          </Section>

          <Section class="box w-full break-inside-avoid m-2 inline-block box-border">
            <div class="">
              <label for="simulation-count" class="text-lg">
                シミュレーションを行う回数:
              </label>
              <input
                type="number"
                id="simulation-count"
                name="simulation-count"
                min={1}
                value={simulators()}
                onInput={(e) => setSimulators(e.currentTarget.valueAsNumber)}
                class="w-5rem text-right p-1 mx-1"
              />
              <span>回</span>
            </div>
          </Section>
        </div>
      </div>

      <div class="flex justify-center m-2">
        <button
          type="submit"
          onClick={() => {
            const task: Task = {
              norma: norma(),
              player: player(),
              udemae: udemaeSystem(),
            };
            props.onSubmit(task, simulators(), 4);
          }}
          class="btn-primary text-2xl p-6"
        >
          シミュレーション開始！
        </button>
      </div>
    </>
  );
};

export default MultiSimulatorInputs;
