import { Component } from "solid-js";
import { Player } from "../udemae-system/player";
import produce from "immer";
import BigNumber from "bignumber.js";
import { Commendation } from "../udemae-system/commendation";

interface WinRatioInputProps {
  value: number;
  onInput: (winRatio: number) => void;
}

const WinRatioInput: Component<WinRatioInputProps> = (props) => {
  const winRatioInPercent = () =>
    new BigNumber(props.value).times(100).toNumber();
  const setWinRatioInPercent = (newValueInPercent: number) =>
    props.onInput(new BigNumber(newValueInPercent).div(100).toNumber());

  return (
    <>
      <label for="win-ratio">勝率:</label>
      <input
        type="range"
        id="win-ratio"
        name="win-ratio"
        min="0"
        max="100"
        step="1"
        value={winRatioInPercent()}
        onInput={(e) => setWinRatioInPercent(e.currentTarget.valueAsNumber)}
        class="align-middle mx-2"
      />
      <output
        id="win-ratio"
        name="win-ratio"
      >{`${winRatioInPercent()}%`}</output>
    </>
  );
};

type CommsRatio = [goldRatio: number, silverRatio: number];

const updateCommsRatio = (
  prev: CommsRatio,
  next: { target: Commendation; value: number }
): CommsRatio => {
  const clampedValue = Math.max(Math.min(1, next.value), 0);
  const otherMax = new BigNumber(1).minus(clampedValue).toNumber();

  switch (next.target) {
    case "gold": {
      return [clampedValue, Math.min(prev[1], otherMax)];
    }
    case "silver": {
      return [Math.min(prev[0], otherMax), clampedValue];
    }
  }
};

interface CommsInputsProps {
  value: [goldRatio: number, silverRatio: number];
  onInput: (value: CommsRatio) => void;
}

const CommsInputs: Component<CommsInputsProps> = (props) => {
  const goldRatioInPercent = () =>
    new BigNumber(props.value[0]).times(100).toNumber();
  const silverRatioInPercent = () =>
    new BigNumber(props.value[1]).times(100).toNumber();
  const noneRatioInPercent = () =>
    new BigNumber(100)
      .minus(goldRatioInPercent())
      .minus(silverRatioInPercent());

  const setGoldRatioInPercent = (newGoldRatioInPercent: number) =>
    props.onInput(
      updateCommsRatio(props.value, {
        target: "gold",
        value: new BigNumber(newGoldRatioInPercent).div(100).toNumber(),
      })
    );
  const setSilverRatioInPercent = (newSilverRatioInPercent: number) =>
    props.onInput(
      updateCommsRatio(props.value, {
        target: "silver",
        value: new BigNumber(newSilverRatioInPercent).div(100).toNumber(),
      })
    );

  return (
    <>
      <div class="my-1">
        <label for="gold-ratio">金表彰を獲得する確率:</label>
        <input
          type="range"
          id="gold-ratio"
          name="gold-ratio"
          min="0"
          max="100"
          step="1"
          value={goldRatioInPercent()}
          onInput={(e) => setGoldRatioInPercent(e.currentTarget.valueAsNumber)}
          class="align-middle p-1 mx-1"
        />
        <output id="gold-ratio" name="gold-ratio">
          {`${goldRatioInPercent()}%`}
        </output>
      </div>

      <div class="my-1">
        <label for="silver-ratio">銀表彰を獲得する確率:</label>
        <input
          type="range"
          id="silver-ratio"
          name="silver-ratio"
          min="0"
          max="100"
          step="1"
          value={silverRatioInPercent()}
          onInput={(e) =>
            setSilverRatioInPercent(e.currentTarget.valueAsNumber)
          }
          class="align-middle p-1 mx-1"
        />
        <output id="silver-ratio" name="silver-ratio">
          {`${silverRatioInPercent()}%`}
        </output>
      </div>

      <div class="my-1">
        <label for="none-ratio">表彰を獲得しない確率:</label>
        <output id="none-ratio" name="none-ratio" class="mx-1">
          {`${noneRatioInPercent()}%`}
        </output>
      </div>
    </>
  );
};

export interface PlayerFormProps {
  player: Player;
  onInput: (player: Player) => void;
}

const PlayerForm: Component<PlayerFormProps> = (props) => {
  return (
    <>
      <div class="my-1">
        <WinRatioInput
          value={props.player.winRatio}
          onInput={(newWinRatio) =>
            props.onInput(
              produce(props.player, (draft) => {
                draft.winRatio = newWinRatio;
              })
            )
          }
        />
      </div>

      <div class="my-1">
        <CommsInputs
          value={props.player.commsRatio}
          onInput={(newComms) =>
            props.onInput(
              produce(props.player, (draft) => {
                draft.commsRatio = newComms;
              })
            )
          }
        />
      </div>
    </>
  );
};

export default PlayerForm;
