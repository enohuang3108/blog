---
title: 實現 AI 逐字回復 - 前端 SSE 的四種方式
description: 介紹四種實作 SSE 的方法
date: 2024-09-13
---

import { Note } from "@/components/Aside";

目前有 3 種 Browser API 可以實作 SSE 的 AI Response，不過各自都會有一些小缺點，最後用一個 Library 來達成這件事。

可以搭配著程式自己玩玩看 [sse-four-methods](https://github.com/enohuang3108/sse-four-methods)

## [EventSource](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)

- Browser 提供處理 SSE 的方法
- 類似`WebSocket` ，會持久連線，需要`evtSource.close()`來關閉連線。
- 只能用 `GET` ( 無法將參數放在 `body`，只能放在 parameter 中 )

```js
const evtSource = new EventSource("/event");

evtSource.onmessage = (event) => {
  const data = event.data;
  //...
};
```

## XHR ( [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/XMLHttpRequest))

- `onprogress` 拿到的 data 會是從開始連接到目前的 data，而不是 chunk
- 可以用 POST

以下用 jQuery 當範例

```js
$.ajax({
  method: "POST",
  url: "/event",
  dataType: "json",
  contentType: "application/json;charset=utf-8",
  data: JSON.stringify({ contents: question }),
  xhrFields: {
    onprogress: function (e) {
      var progressResponse;
      var response = e.currentTarget.response;
    },
  },
});
```

## [Fetch](https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API/Using_Fetch)

- 可以拿到目前的 chunk
- 可以用 POST
- 原生無法解讀 `data:` 之類的 SSE type

```js
fetch("/event", { method: "POST" }).then((response) => {
  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  function readStream() {
    return reader.read().then(({ done, value }) => {
      const chunk = decoder.decode(value, {
        stream: true,
      });

      return readStream();
    });
  }

  return readStream();
});
```

## Library - [@microsoft/fetch-event-source](https://github.com/Azure/fetch-event-source)

- 可以拿到目前的 chunk
- 可以用 POST
- 底層是 Fetch，擴充解讀 `data:` 之類的 SSE type

```js
fetchEventSource("/event", {
  method: "POST",
  onmessage(msg) {
    const data = msg.data;
  },
});
```

> AJAX是什麼
> AJAX ( Asynchronous JavaScript and XML )
> 本身並不是一種技術，而是一種方法論，意旨非同步( 不重新加載整個網頁 )
> 的情況下，取得伺服器資料或更新部分網頁內容。
