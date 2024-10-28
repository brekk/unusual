module.exports = {
  scripts: {
    lint: `eslint src/*.js`,
    rollup: `rollup -c rollup.config.js`,
    build: `nps rollup`,
    bundle: `nps build`,
    test: {
      script: 'vitest --run',
      description: 'test stuff',
      snapshot: 'vitest -u',
      types: 'tsd',
    },
    care: 'nps lint test bundle',
  },
}
