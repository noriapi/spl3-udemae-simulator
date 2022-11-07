import { Component } from "solid-js";

export interface WinLoseViewProps {
  wins: number;
  loses: number;
}

const WinLoseView: Component<WinLoseViewProps> = (props) => {
  return (
    <div class="text-center">
      <div class="inline-block">
        <span class="block text-sm">WIN</span>
        <span class="block text-3xl font-bold">{props.wins}</span>
      </div>
      <div class="inline-block text-3xl">-</div>
      <div class="inline-block">
        <span class="block text-sm">LOSE</span>
        <span class="block text-3xl font-bold">{props.loses}</span>
      </div>
    </div>
  );
};

export default WinLoseView;
