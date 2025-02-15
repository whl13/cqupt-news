const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  devServer: {
    proxy: {
      '/webapi': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
})