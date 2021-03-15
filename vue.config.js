const path = require('path')
const proxyTable = require('./src/config/proxy.js')
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const nodeExternals = require("webpack-node-externals");
const TARGET_NODE = process.env.WEBPACK_TARGET === "node";
const target = TARGET_NODE ? "server" : "client";
const resolve = dir => {
  return path.join(__dirname, dir)
}
module.exports = {
  indexPath:'defaultIndex.html',
  outputDir:  target ? `dist/${target}` : 'dist',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/assets/less/variable.less')] // 引入全局样式变量
    }
},
transpileDependencies:[
  'dom7',
  '_dom7@2.1.3@dom7',
  '_swiper@5.3.8@swiper',
  'swiper'
],
configureWebpack: () => ({
  // 将 entry 指向应用程序的 server / client 文件
  entry: `./src/entry-${target}.js`,
  // 对 bundle renderer 提供 source map 支持
  devtool: 'source-map',
  target: TARGET_NODE ? "node" : "web",
  node: TARGET_NODE ? undefined : false,
  output: {
    libraryTarget: TARGET_NODE ? "commonjs2" : undefined
  },
  // https://webpack.js.org/configuration/externals/#function
  // https://github.com/liady/webpack-node-externals
  // 外置化应用程序依赖模块。可以使服务器构建速度更快，
  // 并生成较小的 bundle 文件。
  externals: TARGET_NODE
    ? nodeExternals({
        // 不要外置化 webpack 需要处理的依赖模块。
        // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
        // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
        allowlist: [/\.css$/]
      })
    : undefined,
  plugins: [TARGET_NODE ? new VueSSRServerPlugin() : new VueSSRClientPlugin()]
}),
  chainWebpack: config => {
    
    config.output.chunkFilename(`js/bz-[name].[chunkhash:8].js`)
    config.output.filename('js/bz-[name].js')

    config.resolve.alias.set('@', resolve('src'))

    config.module
      .rule('eslint')
      .pre()
      .exclude.add(/node_modules/)
      .add(/libs/)
      .end()
      .test(/\.(vue|(j|t)sx?)$/)
      .use('eslint-loader')
      .loader('eslint-loader')
      .options({
        cache: true,
        extensions: ['.js', '.jsx', '.vue'],
        emitError: false,
        emitWarning: true,
        formatter: require('eslint-friendly-formatter')
      })
  },
  devServer: {
    port: 8000,
    proxy: proxyTable || {}
  }
}
