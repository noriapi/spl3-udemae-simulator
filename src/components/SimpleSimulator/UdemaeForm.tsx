import { Component, createSignal, Show } from "solid-js";
import { INITIAL_UDEMAE, Udemae } from "../../udemae-system/udemae";
import UdemaeInputs from "../UdemaeInputs";

export interface UdemaeFormProps {
  title?: string;
  submitLabel?: string;
  onSubmit: (udemae: Udemae) => void;
}

const UdemaeForm: Component<UdemaeFormProps> = (props) => {
  const [udemae, setUdemae] = createSignal<Udemae>(INITIAL_UDEMAE);

  const handleSubmitUdemae = () => {
    props.onSubmit(udemae());
  };

  return (
    <>
      <Show when={props.title} keyed>
        {(title) => <h4 class="text-lg mb-3">{title}</h4>}
      </Show>
      <div class="">
        <UdemaeInputs udemae={udemae()} onInput={setUdemae} />
      </div>
      <div class="text-right mt-5">
        <button onClick={handleSubmitUdemae} class="btn-primary">
          {props.submitLabel ?? "決定"}
        </button>
      </div>
    </>
  );
};

export default UdemaeForm;
