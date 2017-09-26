module.exports = {
  server: {
    host: '127.0.0.1',
    port: 8080
  },
  proxyTable: {
    '/a/': {
      target: 'http://192.168.101.206:8180/community',
      changeOrigin: true
    }
  }
}
