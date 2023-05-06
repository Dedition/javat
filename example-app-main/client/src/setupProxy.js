const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  if (process.env.REACT_APP_WITHIN_DOCKER) {
    app.use(
      '/api',
      createProxyMiddleware({
        target: 'http://api:5000',
        changeOrigin: true
      })
    );
  } else {
    app.use(
      '/api',
      createProxyMiddleware({
        target: 'http://localhost:5000',
        changeOrigin: true
      })
    );
  }
};
