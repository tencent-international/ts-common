# 发布流程说明

## 概述

本项目使用自动化的发布流程，当代码推送到 `main` 分支时会自动触发发布流程。

## 发布流程

### 1. 推送触发发布
当有代码推送到 `main` 分支时：

1. **获取当前版本**: 使用 `npm pkg get version` 获取当前版本号
2. **计算新版本**: 自动将 patch 版本号 +1
3. **设置新版本**: 使用 `npm pkg set version` 更新版本号
4. **构建项目**: 运行 `npm run build`
5. **发布包**: 发布到 GitHub Packages
6. **创建发布分支**: 创建 `main/v{新版本号}` 分支
7. **创建PR**: 自动创建带有 `release` 和 `auto-merge` 标签的PR

### 2. 自动合并PR
当发布PR被创建时：

1. **检查标签**: 确认PR有 `release` 和 `auto-merge` 标签
2. **自动合并**: 如果PR可以合并，则自动合并到 `main` 分支

### 3. 合并后创建Release
当发布PR被合并时：

1. **提取版本号**: 从PR标题中提取版本号
2. **创建Git标签**: 创建版本标签
3. **创建GitHub Release**: 在GitHub上创建正式发布

## 工作流文件

- `.github/workflows/release.yml`: 主要的发布流程（推送时触发）
- `.github/workflows/auto-merge.yml`: 自动合并PR和创建Release的流程

## 版本号规则

- 当前版本: `1.2.3`
- 新版本: `1.2.4` (patch + 1)
- 只升级 patch 版本，保持 major 和 minor 版本不变



## 注意事项

1. 确保 `main` 分支的代码质量，因为推送会直接触发发布
2. 发布PR会自动合并，无需手动干预
3. 所有发布都会自动创建Git标签和GitHub Release
4. 包会发布到 GitHub Packages 注册表

## 手动发布

如果需要手动发布，可以：

1. 直接推送到 `main` 分支
2. 或者手动创建带有 `release` 和 `auto-merge` 标签的PR 