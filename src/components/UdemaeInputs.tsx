import { Component, For, Show } from "solid-js";
import { Udemae } from "../udemae-system/udemae";
import produce from "immer";
import * as N from "../udemae-system/udemae-name";

export interface UdemaeInputsProps {
  udemae: Udemae;
  onInput: (udemae: Udemae) => void;
  disabled?: boolean;
}

const UdemaeInputs: Component<UdemaeInputsProps> = (props) => {
  return (
    <>
      <div class="my-1">
        <label for="udemae-name-str">ウデマエ:</label>
        <select
          id="udemae-name-str"
          name="udemae-name-str"
          value={props.udemae.name.str}
          onInput={(e) => {
            const newStr = e.currentTarget.value as N.UdemaeNameStr;
            const newName: N.UdemaeName =
              newStr === "S+" ? { str: "S+", num: 0 } : { str: newStr };

            props.onInput(
              produce(props.udemae, (draft) => {
                draft.name = newName;
              })
            );
          }}
          disabled={props.disabled}
          class="pl-2 py-1 mx-2 text-md"
        >
          <For each={N.ALL_UDEMAE_NAME_STR}>
            {(str) => <option value={str}>{str}</option>}
          </For>
        </select>
        <Show
          when={
            props.udemae.name.str === "S+" && { num: props.udemae.name.num }
          }
          keyed
        >
          {({ num }) => (
            <input
              type="number"
              min={0}
              max={50}
              disabled={props.disabled}
              value={num}
              onInput={(e) => {
                const value = e.currentTarget.valueAsNumber;
                if (N.isSPlusNumber(value)) {
                  props.onInput(
                    produce(props.udemae, (draft) => {
                      draft.name = { str: "S+", num: value };
                    })
                  );
                }
              }}
              class="text-md py-1 w-16 text-right"
            />
          )}
        </Show>
      </div>

      <div class="my-1">
        <label for="udemae-point">ポイント:</label>
        <input
          id="udemae-point"
          name="udemae-point"
          type="number"
          min="-9999"
          max="9999"
          value={props.udemae.point}
          onInput={(e) =>
            props.onInput({
              ...props.udemae,
              point: e.currentTarget.valueAsNumber,
            })
          }
          disabled={props.disabled}
          class="w-4rem text-right p-1 mx-2"
        />
      </div>
    </>
  );
};

export default UdemaeInputs;
