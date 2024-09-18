---
title: 舊專案不能 import library - 談 JS 模組系統與 Bundler
description: 分析舊專案不能 import library 的原因，並介紹 JS 的模組系統與 Bundler 的關係
date: 2024-09-13
---

公司的專案要導入 library 時遇到了問題，因為專案的技術比較舊，並沒有導入 Bundler ( 其實算是有，但只有做壓縮 ) ，也趁這個機會了解 JS 的模組系統與分析為什麼需要 Bundler，先把目前的 現況分析一下。

## 現狀分析

1. 專案內部的 JS 是使用 Regular JS (沒有 module system 的純 JS)
2. 其他使用的 library 應該都是 UMD 的模組系統
3. 要引入的 library 是 [@microsoft/fetch-event-source](https://github.com/Azure/fetch-event-source)，支援 ESM 與 CJS
4. node.js 版本 12.20.1
   1. node 12.20.1 完全支援到 ES2019，之後的 JS 版本的新功能為部分支援，[Node.js 與 JS 版本對照表](https://node.green/)可以從這邊查 Node.js 的版本有支援那些 JS 功能

## 背景知識

隨著 JS 的演進，模組的需求也逐漸出現，簡單比較一下不同模組系統的差別。

- Regular JS：[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)所使用的名詞，指的是沒有 module system 的 JS
- CJS ( Common JS )
  - 常用於 Node.js 之類的 Server
  - 使用同步( Synchronous )的方式載入模組
  - 使用`require()`導入，`module.exports`導出
- AMD ( Asynchronous Module Definition )
  - 可以用於 Server 或是 Browser ( 需要使用 RequireJS 載入模組 )
  - 使用非同步( Asynchronous )的方式，可以並行載入模組
  - 使用`define()`定義/導出，`require()`載入
- UMD
  - 整合 CJS 與 AMD
  - 用於 Server 或是 Browser
  - 依照環境是 CJS 還是 AMD 來使用同步或是非同步的方式載入模組
  - 判斷環境是 AMD 還是 CJS，如果都不是的話就是 Browser，UMD 就會將模組載入到 `window` ( Browser 環境中 `this` = `window`)

```js
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.myModule = factory();
  }
})(this, function () {
  return {
    sayHello: function () {
      console.log("Hello from UMD");
    },
  };
});
```

> 上面這段 JS 需要用 `<script></script>` 來執行，this 才會是 window，如果用 `<script type="module"></script>`，this 會是 undefined

![stripts_vs_modules](public/2024/js-module-system-and-bunlder/stripts_vs_modules.png)
圖片來源：[Modules
(exploringjs.com)](https://exploringjs.com/es6/ch_modules.html#sec_modules-vs-scripts)

- ESM ( ECMAScript Modules )
  - 用於 Server 或是 Browser
  - 使用同步或非同步的方式載入模組
  - 使用`import`導入，`export`導出
  - 靜態分析，在 Bundle 時可以分析所需要的依賴，可以用於 tree-shaking
  - JS 官方於 ES6( ES2015 ) 版本正式支援的模組系統
  - Node.js 在 2020 年 [v12.17.0 開始正式支援 ESM](https://github.com/nodejs/node/blob/main/doc/changelogs/CHANGELOG_V12.md#2020-05-26-version-12170-erbium-lts-targos)

## 解決問題

怎麼導入 [@microsoft/fetch-event-source](https://github.com/Azure/fetch-event-source)？前面有說到這個 library 有提供 CJS 與 ESM 的版本，我們就分別以兩種方式導入 Library。

### 導入 CJS 版本

因為我們專案是在 Browser 上執行，所以 CJS 這個模組系統勢必不能使用，必需先轉成 ESM 或 UMD，因為 Library 已經有提供 ESM 的版本，這邊先討論 UMD 的方式。

- CJS 轉成 UMD

前端生態目前有滿多 Bundler 工具在做這件事的，像是 Rollup、Webpack、ESBuild，甚至包含 ESBuild 和 Rollup 的 Vite。這邊使用 Rollup 來做 bundle。

Rollup 原生[只支援從 ESM 的轉換](https://rollupjs.org/introduction/#overview)，但可以透過插件的方式來支援 CJS，所以我們使用 `rollup` 與`@rollup/plugin-commonjs`進行 bundle，並且因為 UMD 會將模組加到全域中，必須要指定變數名稱 `sse`。

```js
const commonjs = require('@rollup/plugin-commonjs'),
const rollup = require("rollup"),

const bundle = () => {

    const inputFile = ".../@microsoft/fetch-event-ource/lib/cjs/index.js";
    const outputFile = "./srpt/static/new_srpt/js/vendor.js";

    return rollup.rollup({
        input: inputFile,
        plugins: [commonjs()],
    })
    .then((bundle) =>
        bundle.generate({
            format: "umd",
            name: "sse",
        })
    )
    .then(({ output }) => {
        const bundleCode = output[0].code;
        // 把 bundleCode 加到你要的地方
    })
}
```

### 導入 ESM 版本

ESM 就簡單多了，Rollup 本身就支援 ESM 的轉換，所以就不需要 `@rollup/plugin-commonjs`了，其他部分與導入 CJS 一樣。

```js
const rollup = require("rollup"),

const bundle = () => {

    const inputFile = ".../@microsoft/fetch-event-ource/lib/esm/index.js";
    const outputFile = "./srpt/static/new_srpt/js/vendor.js";

    return rollup.rollup({
        input: inputFile,
    })
    .then((bundle) =>
        bundle.generate({
            format: "umd",
            name: "sse",
        })
    )
    .then(({ output }) => {
      const bundleCode = output[0].code;
      // 把 bundleCode 加到你要的地方
    })
}
```

> <strong>為什麼需要轉成 UMD? Browser 不是支援 ESM 嗎?</strong> <br />
> Browser 確實可以直接使用 ESM，但因為 SR 放 Library 的 vender.js 不是 Module
> 的，所以這個 Case 不能直接使用 ESM。

### 引用模組

因為 `sse` 已經被掛到全域底下，所以可以直接使用 `sse`，或是 `window.sse`

```js
sse.fetchEventSource();
```

## 怎麼使用 ESM?

節錄 [Node.js ESM (nearform.com)](https://commerce.nearform.com/blog/2021/node-esm-and-exports) 的內容

1. 要讓 Node.js 把所有檔案解析成 ESM，可以將`package.json`裡面增加`"type": "module"`。
2. 檔名以`.mjs`結尾，Node.js 會用 ESM 的方式執行。
   - `app.js`（CJS）
   - `app.cjs`（CJS）
   - `app.mjs`（ESM）
3. 至於 Browser 需要用 `<script  type="module"></script>` 來讓 Browser 知道要用 ESM 來執行。
