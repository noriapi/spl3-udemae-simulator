import { batch, Component, createSignal, Show } from "solid-js";
import {
  createUdemaeSystem,
  INITIAL,
  step,
  stepWithoutSettle,
  UdemaeSystem,
} from "../../udemae-system";
import { DEFAULT_PLAYER, run } from "../../udemae-system/player";
import { INITIAL_UDEMAE, Udemae } from "../../udemae-system/udemae";
import ChallengeView from "../ChallengeView";
import PlayerForm from "../PlayerForm";
import UdemaeView from "../UdemaeView";
import Section from "../Section";
import {
  Dialog,
  DialogOverlay,
  DialogPanel,
  Transition,
  TransitionChild,
} from "solid-headless";
import { FaSolidChevronDown } from "solid-icons/fa";
import UdemaeInputs from "../UdemaeInputs";

interface UdemaeFormDialogProps {
  onSubmit?: (udemae: Udemae) => void;
  onOpen?: () => Udemae;
}

const UdemaeFormDialog: Component<UdemaeFormDialogProps> = (props) => {
  const [udemae, setUdemae] = createSignal(INITIAL_UDEMAE);

  const [isOpen, setIsOpen] = createSignal(false);

  const closeDialog = () => {
    setIsOpen(false);
  };

  const openDialog = () => {
    batch(() => {
      setIsOpen(true);
      const initialValue = props.onOpen?.() ?? INITIAL_UDEMAE;
      setUdemae(initialValue);
    });
  };

  const handleSubmit = () => {
    batch(() => {
      closeDialog();
      props.onSubmit?.(udemae());
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={openDialog}
        class="inline-flex items-center btn-primary"
      >
        <span>ウデマエをリセット</span>
        <FaSolidChevronDown
          class="stroke-current ml-2 h-5 w-5 group-hover:text-opacity-80 transition ease-in-out duration-150"
          aria-hidden="true"
        />
      </button>

      <Transition appear show={isOpen()}>
        <Dialog
          isOpen
          onClose={closeDialog}
          class="fixed inset-0 z-10 overflow-y-auto"
        >
          <div class="min-h-screen px-4 flex items-center justify-center">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <DialogOverlay class="fixed inset-0 bg-gray-900 bg-opacity-50" />
            </TransitionChild>

            <span class="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>

            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle bg-gray-50 shadow-xl rounded-2xl transition-all transform ">
                {/* <div class="absolute top-3 right-3">
                  <button
                    class="w-10 h-10 rounded-full flex justify-center items-center hover:bg-gray-200"
                    onClick={closeDialog}
                  >
                    <IoClose class="w-5 h-5" />
                  </button>
                </div> */}
                <div class="">
                  <UdemaeInputs udemae={udemae()} onInput={setUdemae} />
                </div>
                <div class="text-right mt-5">
                  <button onClick={handleSubmit} class="btn-primary">
                    このウデマエにリセット
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

const SimpleSimulator: Component = () => {
  const [us, setUs] = createSignal(INITIAL);
  const [usUnsettled, setUsUnsettled] = createSignal<
    UdemaeSystem | undefined
  >();
  const [player, setPlayer] = createSignal(DEFAULT_PLAYER);

  const handleSubmitUdemae = (udemae: Udemae) => {
    setUs(createUdemaeSystem(udemae));
  };

  const handleSubmit = () => {
    const result = run(player());
    const newUsUnsettled = stepWithoutSettle(us(), result);
    const newUs = step(us(), result);
    batch(() => {
      setUsUnsettled(newUsUnsettled);
      setUs(newUs);
    });
  };

  return (
    <div class="flex flex-col gap-y-10 w-full max-w-screen-md mx-auto pt-10">
      <div class="flex h-60 gap-x-2">
        <Section
          class="flex-auto box flex flex-col"
          title={us().challenge?.tag === "Promotion" ? "昇格戦" : "チャレンジ"}
        >
          <Show when={usUnsettled()?.challenge && usUnsettled()} keyed>
            {(us) => (
              <ChallengeView challenge={us.challenge!} name={us.udemae.name} />
            )}
          </Show>
        </Section>
        <Section class="flex flex-col box" title="ウデマエ">
          <UdemaeView sys={us()} />
          <div class="flex-auto flex place-items-center">
            <UdemaeFormDialog
              onSubmit={handleSubmitUdemae}
              onOpen={() => us().udemae}
            />
          </div>
        </Section>
      </div>

      <div class="flex items-center">
        <Section class="box flex-initial" title="パラメータ">
          <div class="m-1">
            <PlayerForm player={player()} onInput={setPlayer} />
          </div>
        </Section>
        <div class="flex-auto flex justify-center">
          <button
            type="submit"
            onClick={handleSubmit}
            class="text-3xl btn-primary p-6"
          >
            試合開始!
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimpleSimulator;
