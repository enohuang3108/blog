---
title: 如何實現 AI Streaming - Python 的同步與非同步
description: 本文探討 WSGI 與 ASGI 的差異，並展示如何在 Django 中使用 ASGI 實現 AI Streaming 的非同步處理。
date: 2024-09-06
---

最近在處理 AI Streaming 回覆的功能，遇到了一些同步與非同步的問題。

在單執行緒的狀況下，使用同步 ( Sync ) 的方法執行耗時的 I/O 任務，則會遇到阻塞 (Blocking) 的問題，即使後續任務很簡單，也會因為前面的阻塞而等待，這時候就需要使用非同步 ( Async ) 的方式分批來執行目前的任務。

![Sync and Async](public/2024/how-to-implement-ai-streaming/sync-and-async.jpg)

## Web Server 與 Application Server

- Web Server 靜態資源伺服器
- Application Server 處理動態、邏輯的伺服器

一般來說 Web Server 會在 Application Server 之前，類似 Reverse proxy，如果 Client 訪問的是靜態資源，Web Server 直接返回靜態資源；如果 Client 訪問動態資源，則要轉交給 Application Server 來處理。
而 Web Server 與 Application Server 之間的溝通就要透過 WSGI 或 ASGI 來處理。

## 什麼是 WSGI

WSGI (Web Server Gateway Interface)，如上所述，是 Web Server 與 Application Server 溝通的協議，可以處理同步的請求。

![WSGI](public/2024/how-to-implement-ai-streaming/wsgi.jpg)

## 什麼是 ASGI

ASGI (Asynchronous Server Gateway Interface)，也是 Web Server 與 Application Server 溝通的協議，與 WSGI 不同的是，除了同步請求還支援非同步請求。

公司的專案原本是 WSGI 的模式，但因為要加上 AI Streaming 回覆的功能，所以需要改成用 ASGI。
因為 AI Streaming 回覆需要同時「產生訊息」以及「回傳訊息」，此時需要非同步來處理這兩個事件。

## Django 怎麼使用 ASGI

新增 `asgi.py`

```python
import os
from channels.routing import ProtocolTypeRouter
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mysite.settings')

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
    }
)
```

修改 `settings.py`

```python
INSTALLED_APPS = [
    'daphne',
	#...
]
# 將 WSGI_APPLICATION = 'mysite.wsgi.application' 改成以下
ASGI_APPLICATION = 'mysite.asgi.application'
```

實作 Streaming 前先來介紹一些會遇到的名詞。

## Return 與 Yield

使用 `yield` 的 Function 會返回 generator，並且執行到 `yield` 時不會像是 `return` 退出 Function，而是暫停 Function 並回傳一個值，下次回來從原本的地方繼續執行，所以使用 `yield` 可以依序返回多個值。

## Iterator 與 Generator

介紹 Generator 前需要先了解 Iterator，了解 Iterator 之前需要先知道什麼是 Iterable。

### Iterable

```python
mylist = [1, 2, 3]
for i in mylist:
    print(i)
```

上面例子中可以進行一項一項讀取值的 mylist，就是一個 Iterable 物件。
但 mylist 中所有的值是放在記憶體內的，當 mylist 的值很多就不是一件適合的作法。

### Iterator

Iterable 可以轉成 Iterator 物件，轉成 Iterator 後可以用`__next__()` 方法依序回傳內部資料。

```python
my_list = [1, 2, 3] # Iterable
iterator = iter(my_list)  # 取得一個 iterator
print(next(iterator))  # 1
print(next(iterator))  # 2
print(next(iterator))  # 3
```

其實 for 裡面也包裝一樣的事情，先將 `my_list` 轉為 Iterator 再用 next 取得值

```python
for i in my_list
	print(i)
```

for ... in ... 的 `in` 其實就是複寫了 `__iter__` 將 Iterable 轉成 Iterator

```python
 @overload
    def __iter__(self: LiteralString) -> Iterator[LiteralString]:
```

### Generator

Generator 可以用來產生 iterator，但這個 iterator 一次只會 iterate(迭代) 一次，不會將所有的值放在記憶體中。

```python
def generator(n):
    i = 1
    while i <= n:
        yield i
        i += 1

iterator = generator(5)

for num in iterator:
    print(num)
```

for 迴圈不是接收 iterable 的物件嗎，為什麼 iterator 也可以傳進來?
其實 iterator 也是一個 iterable 物件，可以用以下程式驗證

```python
from collections.abc import Iterable, Iterator

my_list = [1, 2, 3]

print(isinstance(my_list, Iterable))  # True
print(isinstance(my_list, Iterator))   # False

my_iterator = iter(my_list)

print(isinstance(my_iterator, Iterable))  # True
print(isinstance(my_iterator, Iterator))   # True
```

## 怎麼實作 Streaming?

下面例子使用 fastapi 的 `StreamingResponse` 方法來實現 Streaming，裡面的 event_stream Function 其實就是使用 async 的方式非同步的處理 HTTP Request 和 sleep( 模擬長時間任務 )，借由 yield 來非同步回傳 data。

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import uvicorn
import asyncio

app = FastAPI()

async def event_stream():
    for char in "this is streaming data":
        yield f"data: {char}\n\n"
        await asyncio.sleep(0.5)
    yield f"data: Finished\n\n"

@app.post("/events")
async def get_events():
    return StreamingResponse(event_stream(), media_type="text/event-stream")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)

```

## 參考來源：

- [What does the "yield" keyword do in Python? - Stack Overflow](https://stackoverflow.com/questions/231767/what-does-the-yield-keyword-do-in-python)
- [Python - Generator](https://docs.python.org/3/glossary.html#term-generator)
- [Async/Await for Beginners— Understanding Asynchronous Code in Javascript | by Konstantin Münster | JavaScript in Plain English](https://javascript.plainenglish.io/async-await-for-beginners-understanding-asynchronous-code-in-javascript-748b57ae94e2)
- [Python WSGI Applications - DEV Community](https://dev.to/afrazkhan/python-wsgi-applications-1kjb)
