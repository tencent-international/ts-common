#!/bin/bash

# 发布脚本
set -e

echo "🚀 开始发布流程..."

# 检查是否有未提交的更改
if [[ -n $(git status --porcelain) ]]; then
    echo "❌ 有未提交的更改，请先提交或暂存更改"
    exit 1
fi

# 检查当前分支
CURRENT_BRANCH=$(git branch --show-current)
if [[ "$CURRENT_BRANCH" != "main" ]]; then
    echo "⚠️  当前不在 main 分支，建议在 main 分支发布"
    read -p "是否继续？(y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# 获取版本类型
echo "选择版本类型："
echo "1) patch (补丁版本，如 1.0.0 -> 1.0.1)"
echo "2) minor (次要版本，如 1.0.0 -> 1.1.0)"
echo "3) major (主要版本，如 1.0.0 -> 2.0.0)"
read -p "请输入选择 (1-3): " VERSION_TYPE

case $VERSION_TYPE in
    1) VERSION_CMD="patch" ;;
    2) VERSION_CMD="minor" ;;
    3) VERSION_CMD="major" ;;
    *) echo "❌ 无效选择"; exit 1 ;;
esac

# 更新版本号
echo "📦 更新版本号..."
yarn version --$VERSION_CMD --no-git-tag-version

# 获取新版本号
NEW_VERSION=$(node -p "require('./package.json').version")
echo "✅ 版本已更新到: $NEW_VERSION"

# 构建项目
echo "🔨 构建项目..."
yarn build

# 提交更改
echo "📝 提交更改..."
git add .
git commit -m "chore: release v$NEW_VERSION"

# 创建标签
echo "🏷️  创建标签..."
git tag "v$NEW_VERSION"

# 推送代码和标签
echo "📤 推送代码和标签..."
git push origin main
git push origin "v$NEW_VERSION"

echo "✅ 发布流程完成！"
echo "📦 包将自动发布到 GitHub Packages"
echo "🔗 查看包: https://github.com/tencent-international/ts-common/packages" 