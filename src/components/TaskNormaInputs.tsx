import { Component, createSignal } from "solid-js";
import { Norma } from "../udemae-system/task";
import { INITIAL_UDEMAE, Udemae } from "../udemae-system/udemae";
import UdemaeInputs from "./UdemaeInputs";
import produce from "immer";

type RepeatEndType = "battles" | "udemae" | "battles-or-udemae";

const repeatEndTypeOf = ({ battles, udemae }: Norma): RepeatEndType => {
  if (typeof battles !== "undefined" && typeof udemae === "undefined") {
    return "battles";
  } else if (typeof battles === "undefined" && typeof udemae !== "undefined") {
    return "udemae";
  } else {
    return "battles-or-udemae";
  }
};

const updateRepeatEndType = (
  base: Norma,
  defaultNorma: Required<Norma>,
  ret: RepeatEndType
): Norma => {
  switch (ret) {
    case "battles": {
      return {
        battles: base.battles ?? defaultNorma.battles,
      };
    }
    case "udemae": {
      return {
        udemae: base.udemae ?? defaultNorma.udemae,
      };
    }
    case "battles-or-udemae": {
      return {
        battles: base.battles ?? defaultNorma.battles,
        udemae: base.udemae ?? defaultNorma.udemae,
      };
    }
  }
};

export interface TaskNormaInputsProps {
  norma: Norma;
  onInput: (norma: Norma) => void;
}

const TaskNormaInputs: Component<TaskNormaInputsProps> = (props) => {
  const [lastBattles, setLastBattles] = createSignal(1000);

  const noBattles = () => typeof props.norma.battles === "undefined";

  const setBattles = (battles: number) => {
    props.onInput(
      produce(props.norma, (draft) => {
        draft.battles = battles;
      })
    );
    setLastBattles(battles);
  };

  const [lastUdemae, setLastUdemae] = createSignal(INITIAL_UDEMAE);
  const noUdemae = () => typeof props.norma.udemae === "undefined";

  const setUdemae = (udemae: Udemae) => {
    props.onInput(
      produce(props.norma, (draft) => {
        draft.udemae = udemae;
      })
    );
    setLastUdemae(udemae);
  };

  const repeatEndType = () => repeatEndTypeOf(props.norma);
  const setRepeatEndType = (ret: RepeatEndType) => {
    props.onInput(
      updateRepeatEndType(
        props.norma,
        { battles: lastBattles(), udemae: lastUdemae() },
        ret
      )
    );
  };

  return (
    <>
      <div class="w-full">
        <select
          id="repeat-end-type"
          name="repeat-end-type"
          value={repeatEndType()}
          onInput={(e) =>
            setRepeatEndType(e.currentTarget.value as RepeatEndType)
          }
          class="pl-2 py-1 w-max"
        >
          <option value="battles">指定した試合数をこなす</option>
          <option value="udemae">指定したウデマエに到達する</option>
          <option value="battles-or-udemae">
            指定した試合数をこなすか、指定したウデマエに到達する
          </option>
        </select>
        <span class="mx-1">まで</span>
      </div>

      <div class={`border my-1 p-1 ${noBattles() ? "opacity-50" : ""}`}>
        <label for="norma-battles">試合数</label>
        <div>
          <input
            id="norma-battles"
            name="norma-battles"
            type="number"
            min={1}
            value={lastBattles()}
            onInput={(e) => setBattles(e.currentTarget.valueAsNumber)}
            disabled={noBattles()}
            class="p-1 my-1 text-right w-6rem"
          />
          <span class="p-1">回</span>
        </div>
      </div>

      <div class={`border my-1 p-1 ${noUdemae() ? "opacity-50" : ""}`}>
        <h5>ウデマエ</h5>
        <UdemaeInputs
          udemae={lastUdemae()}
          onInput={setUdemae}
          disabled={noUdemae()}
        />
      </div>
    </>
  );
};

export default TaskNormaInputs;
