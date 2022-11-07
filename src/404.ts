export type {};

// Web サイトをサブディレクトリに配置するなら、この値を 1 にする。
const SEGMENT_COUNT = 1;

// 例えば、SEGMENT_COUNT = 1 の場合、
// https://yourname.github.io/repo-name/book/123 のような URL のうち、
// repo-name までをベースアドレスとみなし、末尾のパス (books/123)
// をエンコードして次のような URL へリダイレクトする。
// https://yourname.github.io/repo-name?p=book%2F123

const parsedUrl = new URL(window.location.href);
const path = parsedUrl.pathname.substring(1); //=> repo-name/book/123

const segments = path.split("/"); //=> [repo-name, book, 123]
const repo = segments.slice(0, SEGMENT_COUNT).join("/"); //=> repo-name
const param = segments.slice(SEGMENT_COUNT).join("/"); //=> book/123

const url = new URL(repo, parsedUrl.origin);
url.searchParams.set("p", encodeURIComponent(param));

window.location.replace(url);
