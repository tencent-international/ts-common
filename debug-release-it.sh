#!/bin/bash

echo "🔍 Release-it 调试脚本"
echo "========================"

# 检查 release-it 配置
echo "📋 检查 .release-it.json 配置:"
cat .release-it.json | jq '.'

echo ""
echo "📦 检查 package.json 中的版本:"
echo "当前版本: $(npm pkg get version)"

echo ""
echo "🔧 检查 release-it 依赖:"
npm list release-it @release-it/bumper

echo ""
echo "🌐 检查 npm 配置:"
npm config get registry
npm config get @tencent-international:registry

echo ""
echo "📁 检查构建文件:"
ls -la dist/

echo ""
echo "🔍 模拟 release-it 执行 (dry-run):"
echo "注意: 由于需要 npm 登录，这里只显示配置检查"

# 检查 release-it 配置是否正确
if npx release-it --help > /dev/null 2>&1; then
    echo "✅ release-it 命令可用"
else
    echo "❌ release-it 命令不可用"
fi

echo ""
echo "📝 调试完成！"
echo ""
echo "💡 提示:"
echo "- 在 GitHub Actions 中，GITHUB_TOKEN 会自动提供认证"
echo "- release-it 会自动处理版本递增、Git 标签和 GitHub Release"
echo "- release-it 会自动执行 npm ci 和 npm run build"
echo "- release-it 会自动发布到 GitHub Packages"
echo "- Git push 已禁用，因为 main 是保护分支"
echo "- 版本更新会通过 PR 同步到 main 分支" 