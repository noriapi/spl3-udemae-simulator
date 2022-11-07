import { Component, JSX } from "solid-js";
import { Link } from "@solidjs/router";

export interface LayoutProps {
  children: JSX.Element;
}

const Layout: Component<LayoutProps> = (props) => {
  return (
    <>
      <header class="flex justify-between items-center px-2 py-1 m-1 border-b">
        <div>
          <h1 class="inline-block text-xl">ウデマエシミュレーター</h1>
          <nav class="inline-block mx-4">
            <Link href="/simple">シンプルモード</Link>
            <a class="mx-2">アドバンスモード</a>
          </nav>
        </div>

        <p class="inline-block text-sm text-gray-400">
          スプラトゥーン3のウデマエシステムのシミュレーターです。
        </p>
      </header>
      <main class="flex justify-center">{props.children}</main>
    </>
  );
};

export default Layout;
