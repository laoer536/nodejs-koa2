import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['./src/index'],
  clean: true,
  failOnWarn: false,
  rollup: {
    esbuild: {
      minify: true,
    },
  },
})
