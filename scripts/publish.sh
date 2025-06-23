#!/bin/bash
set -e

# 切换到项目根目录
cd "$(dirname "$0")/.."

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

# 执行发布流程
yarn install
yarn semantic-release -e ./.ci/release.config.js
npm version $(cat .ci/.version)
npm publish
