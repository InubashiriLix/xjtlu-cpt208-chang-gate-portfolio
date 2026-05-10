# 修复前端 ChatGPT 5.5 Chat 页面的 Invalid JSON 错误

## 问题描述

在 DeepSeek ChatGPT 5.5 Chat 页面中，发送消息后偶尔出现 JSON 解析错误。控制台报错 `Uncaught SyntaxError: Unexpected token` 或 `JSON.parse` 相关错误。部分情况下 AI 返回了内容但前端没有正确渲染。

---

## 对话记录

**用户**: 我的 DeepSeek Chat 页面上线后总是不稳定，经常出现 invalid JSON 错误。能帮我看看代码吗？

**ChatGPT 5.5**: 先看一下你的 API 调用逻辑和相关状态管理。

**用户**: 核心代码是这样的：

```jsx
const response = await fetch("/api/deepseek", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

const data = JSON.parse(await response.text());
const content = data.choices[0].message.content;
setMessages([...messages, { id: Date.now(), role: "assistant", content }]);
```

**ChatGPT 5.5**: 问题找到了 — 你直接用了 `JSON.parse()` 而没有做任何防御性检查。这里有三个隐患：

1. **非 JSON 响应**: 如果 API 返回了 4xx/5xx 状态码，响应体可能是纯文本错误信息而非 JSON，直接解析会抛异常。
2. **空内容**: `choices[0].message.content` 可能为 `null` 或 `undefined`，需要兜底。
3. **并发状态**: `setMessages` 依赖了闭包中的 `messages`，在快速连续发送时可能导致状态丢失。

**ChatGPT 5.5**: 我来重构这段逻辑，加入必要的防御措施和错误处理。

```jsx
const response = await fetch("/api/deepseek", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

// 先检查 Content-Type，再决定如何解析
const contentType = response.headers.get("Content-Type") || "";
const data = contentType.includes("application/json")
  ? await response.json()
  : { error: await response.text() };

if (!response.ok) {
  throw new Error(
    data.error || data.message || "Ask request failed."
  );
}

const content = data.choices?.[0]?.message?.content;
if (!content) {
  throw new Error("ChatGPT 5.5 returned an empty answer.");
}

// 使用函数式更新避免闭包陷阱
setMessages(prev => [...prev, { id: Date.now(), role: "assistant", content }]);
```

**用户**: 还有一个问题：如果用户打字很快，连续按 Enter 发送，会同时发出多个请求。

**ChatGPT 5.5**: 可以加一个 `loading` 状态锁来防止重复提交：

```jsx
const [status, setStatus] = useState("idle");

async function sendMessage() {
  const trimmed = input.trim();
  if (!trimmed || status === "loading") return;

  setInput("");
  setError("");
  setStatus("loading");

  try {
    // ... fetch 逻辑 ...
    setStatus("ready");
  } catch (err) {
    setError(err.message);
    setStatus("error");
  }
}
```

**用户**: 还有一个细节 — 如果我部署到 GitHub Pages 静态托管，不能用 `/api/deepseek` 做代理转发。怎么处理？

**ChatGPT 5.5**: 可以加一个 fallback 策略：开发环境走本地代理，生产环境直接从前端调用 DeepSeek API（需要把 key 打包进前端代码或用环境变量注入）：

```jsx
const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";
const FRONTEND_DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY || "";

function canUseLocalDeepSeekProxy() {
  if (typeof window === "undefined") return true;
  return ["localhost", "127.0.0.1"].includes(window.location.hostname);
}

// 在 sendMessage 中：
const useFrontendDeepSeek = Boolean(FRONTEND_DEEPSEEK_API_KEY);

if (!useFrontendDeepSeek && !canUseLocalDeepSeekProxy()) {
  throw new Error(
    "线上 Ask 功能缺少前端 DeepSeek API key。请在环境变量中配置 VITE_DEEPSEEK_API_KEY 后重新构建部署。"
  );
}

const response = await fetch(
  useFrontendDeepSeek ? DEEPSEEK_API_URL : "/api/deepseek",
  {
    method: "POST",
    headers: useFrontendDeepSeek
      ? {
          "Content-Type": "application/json",
          Authorization: `Bearer ${FRONTEND_DEEPSEEK_API_KEY}`,
        }
      : { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }
);
```

**用户**: 解决了！现在错误处理覆盖了三种情况：后端代理不可用、API 返回非 JSON 错误、以及空回复。连续快速发送也不会出问题了。

---

## 解决方案总结

| 问题 | 解决方案 |
|------|----------|
| 非 JSON 错误响应导致 `JSON.parse` 失败 | 先检查 `Content-Type`，根据类型选择 `.json()` 或 `.text()` |
| `choices[0].message.content` 为空 | 可选链 + 显式空值检查，抛出可读错误信息 |
| 快速连续发送导致状态竞争 | 用 `status === "loading"` 锁防止重复提交 |
| 静态托管没有后端代理 | 环境变量注入 frontend API key，开发/生产自动切换 |

最终代码见 `src/pages/DeepSeekPage.jsx`。
