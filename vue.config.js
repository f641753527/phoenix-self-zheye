module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://mock.yonyoucloud.com/mock/16050/',
        changeOrigin: true
      }
    }
  }
}
