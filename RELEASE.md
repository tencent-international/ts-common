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
- ✅ 自动版本号升级
- ✅ 发布到 GitHub Packages
- ✅ 创建 Git 标签
- ✅ 创建 GitHub Release
- ✅ 在 PR 中评论发布结果

## 🔢 版本号规则

版本号会根据 PR 标题和描述自动判断升级类型：

### Major 版本 (x.0.0)
PR 标题或描述包含以下关键词：
- `major`
- `breaking`

### Minor 版本 (0.x.0)  
PR 标题或描述包含以下关键词：
- `minor`
- `feature`

### Patch 版本 (0.0.x)
其他所有情况

## 📝 PR 标题示例

```
feat: add new dictionary functionality  # 升级 minor 版本
fix: resolve event bus memory leak      # 升级 patch 版本
breaking: change API interface          # 升级 major 版本
```

## 🔧 手动发布

如果需要手动发布，可以：

1. 直接推送到 main 分支
2. 或者使用 GitHub CLI：
   ```bash
   gh workflow run release.yml
   ```

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

- 确保 PR 标题清晰描述变更内容
- 重大变更请使用 `breaking` 关键词
- 新功能请使用 `feature` 关键词
- 修复请使用 `fix` 关键词 