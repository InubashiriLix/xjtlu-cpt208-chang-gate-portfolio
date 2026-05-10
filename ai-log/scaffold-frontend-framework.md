# 搭建前端应用框架 — React + Vite 原型基础

## 背景

课程项目 Human-Centric Computing (A1 - 苏州运河·阊门) 需要一个移动端优先的探索原型。需求是"一个 polished frontend-only web app"，没有后端，但要支持故事展示、路线导航、互动问答和纪念品明信片。

---

## 对话记录

**用户**: 我需要从零搭一个前端应用，技术栈用 React + Vite，能跑 GitHub Pages。能帮我搭好基础框架吗？

**ChatGPT 5.5**: 先明确你的需求结构。从你的描述来看需要这几层：

1. **路由层** — 多页面导航（首页、地图、详情、明信片、Chat）
2. **布局层** — 统一的底部导航栏和页面容器
3. **状态层** — 全局共享（语言、定位、路线进度）
4. **数据层** — 地点内容、路线定义、静态资源

我先初始化项目：

```bash
npm create vite@latest . -- --template react
npm install react-router-dom
```

**ChatGPT 5.5**: 项目初始化后，建立目录结构如下：

```
src/
  assets/         # 静态图片
  components/     # 可复用组件（导航栏、卡片、时间线）
  context/        # React Context 全局状态
  data/           # 内容数据（地点、路线、翻译）
  pages/          # 页面组件
  styles/         # 全局 CSS
  utils/          # 工具函数
```

**ChatGPT 5.5**: 路由配置用 `HashRouter` + `base: './'`，这样 GitHub Pages 不需要服务端路由重写。

```jsx
// src/main.jsx
import { HashRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <AppStateProvider>
      <App />
    </AppStateProvider>
  </HashRouter>
);
```

```jsx
// src/App.jsx
export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/spots/:slug" element={<SpotDetailPage />} />
        <Route path="/postcard" element={<PostcardPage />} />
        <Route path="/deepseek" element={<DeepSeekPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}
```

**用户**: 布局组件应该长什么样？我希望有个底部导航栏。

**ChatGPT 5.5**: 用 `<nav>` + `NavLink` 实现固定在底部的导航栏，整个页面包在一个 `AppLayout` 里统一管理 padding 和 spacing：

```jsx
// components/AppLayout.jsx
export default function AppLayout({ children }) {
  return (
    <div className="app-shell">
      <main className="app-main">{children}</main>
      <BottomNav />
    </div>
  );
}
```

```jsx
// components/BottomNav.jsx
const navItems = [
  { to: "/", label: "Home", labelZh: "首页" },
  { to: "/map", label: "Map", labelZh: "地图" },
  { to: "/gallery", label: "Gallery", labelZh: "图集" },
  { to: "/postcard", label: "Postcard", labelZh: "明信片" },
  { to: "/deepseek", label: "Ask", labelZh: "提问" },
];
```

**用户**: 状态管理怎么设计？我需要存当前语言、用户位置、选中的路线。

**ChatGPT 5.5**: 用 React Context + `useState` 就够了，不需要引入 Redux。核心思路：

- `AppStateProvider` 包裹全局，提供 `spots`、`language`、`currentLocation`、`selectedRoute` 等
- 语言和路线选择持久化到 `localStorage`
- 地点坐标用 Haversine 公式实时计算与用户的距离

```jsx
// context/AppStateContext.jsx (核心骨架)
export function AppStateProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("lang") === "zh" ? "zh" : "en";
  });
  const [currentLocation, setCurrentLocation] = useState(demoUserLocation);
  const [progress, setProgress] = useState(defaultProgress);

  // 实时计算每个地点到用户的距离
  const spotsWithDistances = useMemo(() =>
    heritageSpots.map(spot => ({
      ...localizeSpot(spot, language),
      distanceMeters: haversineMeters(currentLocation, spot.location),
    })),
    [currentLocation, language]
  );

  const value = useMemo(() => ({
    spots: spotsWithDistances,
    language,
    isChinese: language === "zh",
    toggleLanguage: () => setLanguage(l => l === "zh" ? "en" : "zh"),
    currentLocation,
    // ...
  }), [spotsWithDistances, language, currentLocation, progress]);

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}
```

**用户**: 数据层怎么组织地点内容？每个地点需要什么字段？

**ChatGPT 5.5**: 每个地点应该包含展示、互动、导航三类信息：

```js
// data/spots.js
export const heritageSpots = [
  {
    id: "shantang-street",
    name: "Shantang Street",
    category: "Historic Street",
    // 导航
    location: { lng: 120.6034, lat: 31.3149 },
    distanceMeters: 242,
    walkMinutes: 3,
    // 展示
    storyTitle: "A street where canal memory stays busy",
    storyBody: "Shantang Street...",
    storySnippet: "...",
    // 互动
    mission: "Choose one street detail...",
    quiz: {
      question: "...",
      options: ["...", "...", "..."],
      answerIndex: 2,
    },
    // 关联
    tags: ["Views", "Stories", "Family-friendly"],
    related: ["wharf-steps-corner"],
  },
  // ...更多地点
];
```

**ChatGPT 5.5**: 然后通过 `localizeSpot(spot, language)` 函数在英文和中文之间切换，用展开运算符合并翻译字段：

```js
export function localizeSpot(spot, language) {
  if (language !== "zh") return spot;
  return { ...spot, ...spotTranslations[spot.id] };
}
```

**用户**: CSS 方面有什么建议？我不想用 Tailwind 或组件库，希望能轻量。

**ChatGPT 5.5**: 写一个全局 CSS 文件，用 CSS 变量定义设计系统。移动端优先，核心思路：

- `--teal`, `--amber`, `--orange` 等语义色
- `.page-stack` 统一页面间距
- `.card` 统一卡片样式
- `.button` 体系（primary / secondary / small）
- `.bottom-nav` 固定底部，flex 均匀分布

```css
:root {
  --teal: #2f8a7d;
  --amber: #c9872d;
  --orange: #d97b35;
  --bg: #f5f2ee;
  --surface: #fffdf8;
  --text: #24323a;
  --text-secondary: #5f6b71;
}

.app-shell {
  max-width: 480px;
  margin: 0 auto;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

.page-stack {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  padding-bottom: 5rem;
}
```

**ChatGPT 5.5**: 最终给你的建议路径：

1. `npm create vite` → 装 `react-router-dom` → 写 `main.jsx`（HashRouter）
2. 建 `App.jsx` 路由表 + `AppLayout` + `BottomNav`
3. 建 `AppStateContext.jsx` 全局状态
4. 建 `data/spots.js` 地点数据
5. 写全局 CSS 设计系统
6. 逐个实现页面组件

**用户**: 很好，这个结构够清楚了。我开始在每个页面上添加具体内容。

---

## 框架设计要点总结

| 决策 | 选择 | 原因 |
|------|------|------|
| 路由模式 | HashRouter | GitHub Pages 无需服务端配置 |
| 状态管理 | React Context + useMemo | 无需外部依赖，数据量小 |
| 样式方案 | 纯 CSS + CSS 变量 | 零依赖，控制力强 |
| 多语言 | data 层翻译函数 | 简单可预测，不需要 i18n 库 |
| 构建 | Vite 5 | 快速 HMR，原生 ESM |
| 图片资源 | 直接 import 静态资源 | Vite 处理 hash，适合静态托管 |

最终项目结构见 `src/` 目录下的模块划分。
