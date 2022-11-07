/* @refresh reload */
import "virtual:windi.css";
import { render } from "solid-js/web";
import "./main.css";
import { enableMapSet } from "immer";
import { Router } from "@solidjs/router";
import App from "./App";

enableMapSet();

render(() => {
  return (
    <Router>
      <App />
    </Router>
  );
}, document.getElementById("root") as HTMLElement);
