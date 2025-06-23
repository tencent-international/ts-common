module.exports = {
  branches: ["main",
    {
      name: "develop",
      prerelease: "beta"
    },
    {
      name: "release",
      prerelease: "rc"
    }
  ],
  repositoryUrl: "https://github.com/tencent-international/ts-common.git",
  plugins: [
    ["@semantic-release/commit-analyzer", {
      preset: "conventionalcommits"
    }],
    "@semantic-release/release-notes-generator",
    // ⬇️ 在 prepare 阶段写入 .version
    ["@semantic-release/exec", {
      prepareCmd: "echo ${nextRelease.version} > .ci/.version",
      shell: true
    }],
    ["@semantic-release/git", {
      message: "chore(release): ${nextRelease.version} [skip ci]"
    }]
  ]
}
