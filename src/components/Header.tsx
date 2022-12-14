import { A } from "@solidjs/router";

const Header = () => {
  return (
    <header class="flex justify-between items-center px-2 py-1 m-1 border-b">
      <div>
        <A href={import.meta.env.BASE_URL}>
          <h1 class="inline-block text-xl">ウデマエシミュレーター</h1>
        </A>
        <nav class="inline-block mx-4">
          <A href={`${import.meta.env.BASE_URL}simple`} class="mx-2">
            シンプルモード
          </A>
          <A href={`${import.meta.env.BASE_URL}advance`} class="mx-2">
            アドバンスモード
          </A>
        </nav>
      </div>

      <div class="text-xs text-gray-400 text-right">
        <p>スプラトゥーン3のウデマエシステムのシミュレーターです。</p>
      </div>
    </header>
  );
};

export default Header;
