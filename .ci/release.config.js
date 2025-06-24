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
  repositoryUrl: "git@github.com:tencent-international/ts-common.git",
  plugins: [
    "@semantic-release/commit-analyzer",
    ["@semantic-release/npm", {
      npmPublish: true
    }],
  ]
}
