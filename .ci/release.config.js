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
    "@semantic-release/release-notes-generator",
    ["@semantic-release/npm", {
      npmPublish: true
    }],
    // ["@semantic-release/git", {
    //   message: "chore(release): ${nextRelease.version} [skip ci]"
    // }]
  ]
}
