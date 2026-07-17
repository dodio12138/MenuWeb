# MenuWeb

模块化菜单编辑器，用于快速复刻和编辑餐厅菜单，并导出 PDF、PNG、JPEG 或 CMYK JPEG。

## 快速启动

本地 Node 启动：

```bash
npm install
npm start
```

Docker 启动：

```bash
docker build -t menuweb:latest .
docker rm -f menuweb 2>/dev/null || true
docker run -d --name menuweb -p 8088:80 menuweb:latest
```

打开：

```text
http://localhost:8088/
```

## 主要功能

- 多页面菜单编辑，支持保存和导入工程 JSON。
- 模块化编辑：菜单列表、价格表、步骤模块、冰淇淋口味、Tips、Logo、图例、社交媒体、页面信息模块。
- 模块可拖动、缩放、对齐、填充到右侧/底部。
- 模块支持边框、背景、标题背景、标题描边、圆角、字号、加粗、条目间距和模块内边距。
- 餐品条目支持折叠编辑、单条字号、推荐、Vegan、辣度、手动换行。
- 页面支持 A3、A4、A5、B4、B5 和自定义尺寸，并支持横向/竖向切换。
- 页面边距控制可调整网格距离页面边缘的距离。
- 页面背景图片、Logo 图片、社交媒体图标可从本地导入。

## 导出

顶部工具栏提供：

- 图片格式：PNG 或 JPEG。
- 色彩空间：sRGB 或 CMYK。
- 导出倍率：1x、2x、3x。
- 导出图片：每个页面导出一张图片。
- 导出 PDF：使用当前页面尺寸和打印方向。

CMYK 导出会调用服务端接口：

```text
POST /api/convert-cmyk
```

服务端使用 `sharp` 转换为 CMYK JPEG。浏览器预览仍是 RGB，因此 CMYK 文件颜色与预览可能存在差异。

## 页面与模块

页面信息现在也是一个模块，可以像其他模块一样拖动、缩放和调整样式。左侧页面信息输入会同步到该模块。

常用模块：

- `pageInfo`：页面顶部标题、MENU、网站。
- `logo`：品牌 Logo 和品牌文字。
- `list`：普通餐品列表。
- `priceGrid`：多价格列模块。
- `stepList`：步骤说明模块。
- `flavourGrid`：罐装冰淇淋/口味网格。
- `tips`：紧凑提示模块。
- `legend`：图例模块。
- `social`：社交媒体模块。

## 项目结构

```text
.
├── app.js                  # 前端状态、渲染、编辑、导出逻辑
├── index.html              # 页面结构和 SVG 图标
├── styles.css              # 应用和菜单样式
├── server.js               # Express 静态服务和 CMYK 转换接口
├── Dockerfile              # Docker 镜像
├── assets/                 # 参考菜单图片
└── vendor/html2canvas.min.js
```

## Git 提交筛选

`.gitignore` 已排除本地依赖、日志、测试截图、Playwright 临时文件、构建产物和系统文件。

不应提交：

- `node_modules/`
- `.env`
- `output/`
- `.playwright-cli/`
- `playwright-report/`
- `test-results/`
- `.DS_Store`
- `tmp/`

