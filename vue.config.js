const path = require('path')
// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '' : './',
  // 构建项目生成的目录
  outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devDist',
  // 语法的自动检测
  lintOnSave: true,
  chainWebpack: config => {
    config.module.rules.delete('svg') //重点:删除默认配置中处理svg,
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include.add(path.resolve('src/assets/svg')) //处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
    config.plugin('html').tap(args => {
      args[0].title = 'Template'
      return args
    })
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "./src/styles/main.scss";`
      }
    }
  },
  devServer: {
    open: false, // 运行项目后是否自动打开
    host: '0.0.0.0', // 可以让外部访问
    port: 8000
  }
}
