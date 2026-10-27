# 部署指南

## 📦 打包产物

构建已完成，产物位于 `dist/` 目录：

```
dist/
├── index.html              (460 B)
└── assets/
    ├── index-CTVng2u0.css  (17.81 KB, gzip: 4.25 KB)
    └── index-DBCoEWR-.js   (309.37 KB, gzip: 99.65 KB)
```

**总大小**: ~327 KB (压缩后 ~104 KB)

---

## 🚀 部署方式

### 方式 1: 本地预览（推荐用于测试）

```bash
# 安装静态服务器
npm install -g serve

# 启动预览服务器
serve -s dist

# 访问: http://localhost:3000
```

### 方式 2: Vercel（一键部署）

1. 安装 Vercel CLI
```bash
npm install -g vercel
```

2. 部署
```bash
vercel --prod
```

### 方式 3: Netlify（拖拽部署）

1. 访问 https://app.netlify.com/drop
2. 直接拖拽 `dist` 文件夹到页面
3. 获得即时访问链接

### 方式 4: GitHub Pages

1. 推送代码到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择 `gh-pages` 分支
4. 运行部署脚本:

```bash
npm run build
git add dist -f
git commit -m "Deploy"
git subtree push --prefix dist origin gh-pages
```

### 方式 5: 传统服务器（Nginx/Apache）

将 `dist/` 目录内容上传到服务器，配置示例：

**Nginx 配置**:
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**Apache 配置** (`.htaccess`):
```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
```

---

## ⚙️ 环境变量配置（可选）

如果未来需要连接真实 API，创建 `.env.production` 文件：

```env
VITE_API_BASE_URL=https://api.your-domain.com
VITE_ENABLE_ANALYTICS=true
```

然后在代码中使用：
```js
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

---

## 🔍 构建验证

**检查清单**:
- ✅ 所有资源已打包（CSS + JS）
- ✅ 文件已压缩（gzip）
- ✅ 哈希命名确保缓存破坏（index-DBCoEWR-.js）
- ✅ HTML 引用路径正确

**常见问题**:

**Q: 刷新页面出现 404？**  
A: 需要配置服务器路由回退到 `index.html`（SPA 应用必需）

**Q: 图片加载失败？**  
A: 当前使用外部占位图服务（placeholder.com），需要网络连接

**Q: 样式未生效？**  
A: 检查服务器是否正确设置了 MIME 类型（CSS 为 `text/css`）

---

## 📊 性能指标

- **首次加载**: ~104 KB (gzip)
- **Lighthouse 预期评分**: 
  - Performance: 90+
  - Accessibility: 85+
  - Best Practices: 90+
  - SEO: 80+

---

## 🔄 更新流程

1. 修改代码
2. 运行 `npm run build`
3. 上传 `dist/` 目录到服务器
4. 清除 CDN 缓存（如果使用）

---

## 📝 注意事项

- 产物基于 **Vite 5.4.21** 构建
- 需要现代浏览器支持（ES2015+）
- 不支持 IE11
- 外部依赖: React 18、React Router 6、Tailwind CSS

---

**部署完成后访问应用，所有功能（搜索、筛选、购物车）应正常工作！** 🎉
