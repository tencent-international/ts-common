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
npm --prefix .ci ci
npx --prefix .ci semantic-release -e ./.ci/release.config.js
NEW_VERSION=$(cat .ci/.version)
npm version $NEW_VERSION
npm publish

echo "🔗 查看包: https://github.com/tencent-international/ts-common/packages" 
