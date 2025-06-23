#!/bin/bash
set -e

# 检查未提交更改
[[ -n $(git status --porcelain) ]] && echo "有未提交更改" && exit 1

# 执行发布流程
npm --prefix .ci ci
npx --prefix .ci semantic-release -e ./.ci/release.config.js
npm version $(cat .ci/.version)
npm publish