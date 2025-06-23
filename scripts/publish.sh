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

# 设置环境变量强制 semantic-release 执行真实发布
export CI=true

# 检查 GITHUB_TOKEN 环境变量
if [[ -z "$GITHUB_TOKEN" ]]; then
    # 尝试从 ~/.bashrc 加载
    source ~/.bashrc 2>/dev/null || true
    
    if [[ -z "$GITHUB_TOKEN" ]]; then
        echo "🔑 需要 GitHub Personal Access Token 来发布包"
        echo "请输入你的 GitHub Token (需要 write:packages 权限):"
        read -s GITHUB_TOKEN
        echo
        
        if [[ -z "$GITHUB_TOKEN" ]]; then
            echo "❌ Token 不能为空"
            exit 1
        fi
        
        # 保存到 ~/.bashrc
        echo "export GITHUB_TOKEN=$GITHUB_TOKEN" >> ~/.bashrc
        echo "✅ Token 已保存到 ~/.bashrc，重新打开终端后生效"
    fi
fi

export GITHUB_TOKEN

yarn semantic-release -e ./.ci/release.config.js

echo "✅ 发布完成！"
