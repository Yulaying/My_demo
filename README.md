# Diary Space (Next.js)

一个移动端优先的个人日记网站，支持：

- 日记列表（倒序）
- 新建日记
- 日记详情
- 编辑日记
- 删除确认
- 关键词搜索、按日期筛选
- 自动草稿保存

> 数据存储默认使用浏览器 localStorage，并且已通过独立 `lib/diary-storage.ts` 适配层预留后续切换数据库能力。

## 本地运行

```bash
npm install
npm run dev
```

打开 <http://localhost:3000>

## 生产构建

```bash
npm run build
npm start
```

## 部署到 Vercel（公网可访问，手机可直接通过网址访问）

1. 将当前仓库推送到 GitHub。
2. 登录 Vercel，点击 **Add New Project**，导入该 GitHub 仓库。
3. Framework Preset 选择 **Next.js**（通常自动识别）。
4. 环境变量可先留空（当前 localStorage 版本不依赖服务端变量）。
5. 点击 **Deploy**，等待部署完成。
6. Vercel 会生成类似 `https://your-project.vercel.app` 的公网地址，手机浏览器直接访问即可（不需要与电脑处于同一局域网）。

## 目录说明

- `app/diary`：日记页面路由
- `components/diary`：DiaryList / DiaryCard / DiaryForm / DiaryDetail
- `lib/diary-storage.ts`：存储适配层（当前 localStorage，实现可替换）
- `lib/diary-types.ts`：类型定义

## 后续升级建议

可以在 `lib/diary-storage.ts` 中新增远端适配器，例如：

- Supabase
- Firebase
- Neon / PostgreSQL

并保持页面逻辑不变，实现平滑升级。
