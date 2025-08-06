---
title: Introducing MCP
description: 簡單介紹 MCP 的目的與架構
date: 2025-08-06
---

## AI Agent

AI 如果要與外部世界（資料庫、網路等）互動，必須透過工具來實現。這邊引用 Anthropic 的定義：LLM 會根據當前狀態自主決定流程與使用的工具，持續循環直到完成任務，這樣的系統稱為 **Agent**。

為了讓不同的 AI 能夠使用不同的工具，甚至能夠使用第三方開發的工具，這就需要一個標準化的構通方是，這就是 **MCP (Model Context Protocol)** 的目的。透過 MCP 規範開發的工具，任何遵循相同協議的系統都能夠使用。
![MCP-intro](/2025/introducing-mcp/mcp-architecture.webp)

## Introducing MCP

**MCP (Model Context Protocol)** 是一種標準化協議，定義了 AI 如何使用工具，或者說 AI Client 如何與 Tool Server 進行溝通。

### Client-Server 架構

MCP 採用 Client-Server 架構（或是加上 Host）：

- **MCP Server**: 提供具體的工具或功能，能提供給 AI 使用，例如網路搜尋、資料庫存取等功能
- **MCP Client**: 負責連接 Server 並管理 Context 的 Component
- **MCP Host**: AI 的應用程式，像是 Cursor、Claude Desktop，一個Host 可能有多個 Client
  ![Introducing MCP](/2025/introducing-mcp/mcp-client-server-architecture.webp)

### MCP 的目的

以開發 GitHub Agent 為例：在沒有 MCP 的情況下，你需要逐一實作 GitHub 的各項功能（Push、Pull、Issue 管理等）。但如果服務商提供 MCP 工具，你可以直接透過 MCP 協議使用這些現成的工具，大幅減少開發與維護的負擔。

**使用 MCP 之前：**
<img src="/2025/introducing-mcp/before-mcp-development.webp" alt="使用 MCP 之前" class="w-1/2 rounded-lg mx-auto">

**使用 MCP 之後：**

<div class="flex gap-4">
<img src="/2025/introducing-mcp/after-mcp-development-1.webp" alt="使用 MCP 之後" class="w-1/2 rounded-lg">
<img src="/2025/introducing-mcp/after-mcp-development-2.webp" alt="使用 MCP 之後" class="w-1/2 rounded-lg">
</div>

### MCP Flow

MCP 的大致流程如下：

1. Client 與 Server 建立連接
2. Server 向 Client 提供可用的工具清單
3. Client 將工具清單提供給 LLM
4. LLM 根據任務需求選擇適當的工具，在告訴 Client
5. Client 告訴 Server 要執行哪個工具，還有其參數
6. Server 執行指定的工具
7. 將執行結果回傳給 LLM，LLM 基於結果做出結論或進行下一輪循環

![MCP Flow](/2025/introducing-mcp/mcp-flow.webp)

### MCP Transports

MCP 支援本地與遠端傳輸方式：

#### STDIO（本地）

- 使用 subprocess 在本地執行 MCP Server
- 在同一台機器上 Client 與 Server 通訊
- 支援雙向通訊

![STDIO](/2025/introducing-mcp/mcp-stdio-transport.webp)

#### HTTP（遠端）

由於標準 HTTP 無法讓 Server 主動向 Client 發起請求，所以 Server 端的通知或 Log 功能會受到限制。如果需要這部分功能可以使用 Streamable HTTP 的方式：

##### 1. Streamable HTTP (SSE)

- 設定：`stateless_http=False`, `json_response=False`
- Client 與 Server 初始化後，透過 Server-Sent Events (SSE) 建立持久連接
- 支援 Server 主動向 Client 發送通知

![Streamable MCP](/2025/introducing-mcp/mcp-streamable-http.webp)

##### 2. Stateless HTTP

- 設定：`stateless_http=True`
- 如果需要 load balancer 的話可以使用這種方式
- 缺點：無法支援 Server 主動通知功能，需要在可擴展性與功能性之間做出取捨

![Stateless HTTP](/2025/introducing-mcp/mcp-stateless-http.webp)

## MCP Example

以下是一個簡單的工具實作，示範如何建立 MCP Client 和 Server：

#### Client 端實作

```python
from mcp.client import MCPClient

## 透過 subprocess 建立 MCPClient
client = MCPClient(command=["python", "server.py"])

## use tool
result = client.call_tool("add", {"a": 3, "b": 4})

print("3 + 4 =", result)
```

#### Server 端實作

```python
from mcp.server.fastmcp import FastMCP

## 建立 MCP Server
mcp = FastMCP(name="AdditionServer")

@mcp.tool()
def add(a: int, b: int) -> int:
    """加法工具：回傳 a + b 的結果"""
    return a + b

if __name__ == "__main__":
    mcp.run(transport="stdio")
```

---

### 參考資料

- [Anthropic MCP 介紹課程](https://anthropic.skilljar.com/introduction-to-model-context-protocol/)
- [MCP 官方文件 - 入門指南](https://modelcontextprotocol.io/docs/getting-started/intro)
- [MCP 官方文件 - Server 快速開始](https://modelcontextprotocol.io/quickstart/server)
- [ihower MCP 簡報](https://ihower.tw/presentation/ihower-MCP-2025-05-23.pdf)
