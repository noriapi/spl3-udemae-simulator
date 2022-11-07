import { Component, createSignal } from "solid-js";
import { INITIAL_UDEMAE, Udemae } from "../udemae-system/udemae";
import UdemaeInputs from "./UdemaeInputs";

interface UdemaeFormProps {
  onSubmit: (udemae: Udemae) => void;
}

const UdemaeForm: Component<UdemaeFormProps> = (props: UdemaeFormProps) => {
  const [udemae, setUdemae] = createSignal<Udemae>(INITIAL_UDEMAE);

  return (
    <div>
      <UdemaeInputs udemae={udemae()} onInput={setUdemae} />
      <input
        type="button"
        onClick={() => props.onSubmit(udemae())}
        value="ウデマエをセット"
      />
    </div>
  );
};

export default UdemaeForm;
