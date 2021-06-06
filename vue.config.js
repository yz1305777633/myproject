module.exports = {
  publicPath: '/',
  devServer: {
    overlay: {
      // 让浏览器 overlay 同时显示警告和错误
      warnings: true,
      errors: true
    },
    port: 8080,
    host: 'localhost',
    open: 'chorme',
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' // 路径重写
        }
      }
    }
  }
}