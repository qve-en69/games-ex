module.exports = {
  devServer: {
    disableHostCheck: true,
    port: 80,
    proxy: {
      '/api': {
        'target': 'https://***',
        'changeOrigin': true
      },
      '/socket': {
        'target': 'https://***',
        'ws': true,
        'changeOrigin': true
      }
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "@/assets/css/custom.scss";'
      }
    }
  }
}
