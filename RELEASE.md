# 自动化发布指南

## 🚀 发布流程

本项目使用 GitHub Actions 实现自动化发布。当 PR 合并到 `main` 分支时，会自动触发发布流程。

## 📋 发布检查清单

### PR 创建时
- ✅ TypeScript 类型检查
- ✅ ESLint 代码检查  
- ✅ 构建测试
- ✅ 构建文件验证

### PR 合并时
- ✅ 自动版本号升级 (patch)
- ✅ 发布到 GitHub Packages
- ✅ 创建 Git 标签
- ✅ 创建 GitHub Release
- ✅ 在 PR 中评论发布结果

## 🔢 版本号管理策略

### 自动版本升级
- **每次合并 PR 时自动升级 patch 版本**
- 例如：`1.2.3` → `1.2.4`

### 手动版本升级
对于 major 和 minor 版本升级，需要手动修改 `package.json`：

```json
{
  "version": "1.3.0"  // 手动修改版本号
}
```

### 版本升级类型

| 升级类型 | 示例 | 操作方式 |
|----------|------|----------|
| **Patch** | `1.2.3` → `1.2.4` | 自动升级 |
| **Minor** | `1.2.3` → `1.3.0` | 手动修改 package.json |
| **Major** | `1.2.3` → `2.0.0` | 手动修改 package.json |

## 📝 PR 标题示例

```
feat: add new dictionary functionality  # 自动 patch 升级
fix: resolve event bus memory leak      # 自动 patch 升级
docs: update README                     # 自动 patch 升级
```

## 🔧 手动版本升级步骤

如果需要升级 minor 或 major 版本：

1. **修改 package.json**：
   ```json
   {
     "version": "1.3.0"  // 手动设置新版本
   }
   ```

2. **提交版本更新**：
   ```bash
   git add package.json
   git commit -m "chore: bump version to 1.3.0"
   git push origin main
   ```

3. **创建 PR 并合并** → 自动发布

## 🚀 性能优化

### 缓存策略
- ✅ **npm 缓存**：使用 GitHub Actions 的 npm 缓存
- ✅ **快速安装**：使用 `npm ci` 而不是 `npm install`
- ✅ **依赖复用**：避免重复安装依赖

### 构建时间优化
- 依赖安装时间减少约 60-80%
- 总构建时间显著提升

## 🔧 手动发布

如果需要手动发布，可以：

1. 直接推送到 main 分支
2. 或者使用 GitHub CLI：
   ```bash
   gh workflow run release.yml
   ```

## 🐛 故障排除

### npm 依赖问题
如果遇到 `@rollup/rollup-linux-x64-gnu` 模块找不到的错误，这是 npm 的已知 bug。解决方法：

```bash
# 清理并重新安装依赖
rm -rf node_modules package-lock.json
npm install
```

GitHub Actions 会自动处理这个问题。

## 📦 包信息

- **包名**: `@tencent-international/ts-common`
- **注册表**: GitHub Packages
- **安装**: `npm install @tencent-international/ts-common`

## 🔍 发布状态

发布完成后，你可以在以下位置查看结果：

1. **GitHub Packages**: https://npm.pkg.github.com
2. **GitHub Releases**: 仓库的 Releases 页面
3. **PR 评论**: 自动发布的评论信息

## ⚠️ 注意事项

- 每次合并 PR 会自动升级 patch 版本
- major/minor 版本需要手动修改 package.json
- 确保 PR 标题清晰描述变更内容
- 如果遇到构建错误，检查是否与 npm 依赖问题相关 