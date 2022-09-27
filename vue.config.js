console.log(`現在環境 ${process.env.VUE_APP_MODE}`);
console.log(`現在環境 ${process.env.VUE_APP_BASE_API}`);

'use strict';
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}
// const PreloadWebpackPlugin = require('preload-webpack-plugin');
const name = 'Cloud Wise 管理系統';

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Cloud Wise 管理系統'
    }
  },
  // devServer: {
  //   port,
  //   open: true,
  //   overlay: {
  //     warnings: false,
  //     errors: true,
  //   },
  // },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name,
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    // config.plugin('preload').use(PreloadWebpackPlugin).tap(() => [
    //   {
    //     rel: 'preload',
    //     fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
    //     include: 'initial',
    //   },
    // ]);
    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch');
    config
      .plugin('html-index')
      // .use(html)
      .tap((args) => {
        // args[0].title = 'Cloud Wise 管理系統';
        return args;
      });
  },
})
