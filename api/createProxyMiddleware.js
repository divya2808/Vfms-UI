const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = createProxyMiddleware({
  target: `http://127.0.0.1:8739`,
  pathRewrite: {
    '^/api/': ''
  },
  changeOrigin: true,
  onError: err => {
    consola.error('strong auth proxy error', err)
    throw err
  }
})