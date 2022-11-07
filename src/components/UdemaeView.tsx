import { Component, Match, Show, Switch } from "solid-js";
import * as US from "../udemae-system";
import * as U from "../udemae-system/udemae";

interface UdemaeViewProps {
  sys: US.UdemaeSystem;
}

const UdemaeView: Component<UdemaeViewProps> = (props) => {
  const next = () => {
    const a = U.nextPoint(props.sys.udemae);
    console.log("props.sys.udemae", props.sys.udemae);
    console.log("next", a);
    return a;
  };

  return (
    <div class="grid grid-cols-1 divide-y">
      <div class="px-2 py-1 ">
        <div class="flex justify-between">
          <span>
            <span class="text-4xl font-extrabold">
              {props.sys.udemae.name.str}
            </span>
            <Show when={props.sys.udemae.name.str === "S+"}>
              <span class="text-2xl font-extrabold">
                {props.sys.udemae.name.str === "S+" &&
                  props.sys.udemae.name.num}
              </span>
            </Show>
          </span>
          <span> </span>
          <span class="text-3xl font-extrabold">
            <span>{props.sys.udemae.point}</span>
            <span>p</span>
          </span>
        </div>
      </div>
      <div class="font-bold text-lg text-center">
        <Switch>
          <Match when={props.sys.challenge?.tag === "Promotion"}>
            <span class="font-semibold">昇格戦に挑戦中</span>
          </Match>
          <Match when={U.canPromoteChallenge(props.sys.udemae)}>
            <span class="font-semibold">昇格戦に挑戦可能!</span>
          </Match>
          <Match when={typeof next() !== "undefined" && { next: next() }} keyed>
            {(p) => (
              <span>
                <span>NEXT:</span>
                <span>{p.next}</span>
                <span>p</span>
              </span>
            )}
          </Match>
        </Switch>
      </div>
    </div>
  );
};

export default UdemaeView;
