import type { Component } from "solid-js";
import { Routes, Route, A } from "@solidjs/router";
import Simple from "./pages/simple";
import Advance from "./pages/advance";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App: Component = () => {
  return (
    <div class="flex flex-col min-h-screen">
      <Header />
      <main class="flex justify-center flex-grow">
        <div class="w-full max-w-screen-xl">
          <Routes>
            <Route path={import.meta.env.BASE_URL}>
              <Route path="/simple" component={Simple} />
              <Route path="/" component={Simple} />
              <Route path="/advance" component={Advance} />
            </Route>
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
