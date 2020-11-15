module.exports = {
  runtimeCompiler: true,
  filenameHashing: true,
  indexPath: 'index.html',
  chainWebpack: config => {
    config.plugin('prefetch').tap(options => {
      config.module
        .rule('md')
        .test(/\.md$/)
        .use('html-loader')
        .loader('markdown-loader')
        .end()
      config.plugins.delete('prefetch')
      return options
    })
  },
  configureWebpack: {
    resolve: {},
    optimization: {
      splitChunks: {
        minSize: 0,
      },
    },
  },
  productionSourceMap: false,
  pluginOptions: {
    lintStyleOnBuild: false,
    stylelint: {},
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "src/styles/index.scss";`,
      },
    },
  },
}
