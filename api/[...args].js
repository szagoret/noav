import { createProxyMiddleware } from 'http-proxy-middleware';

export default createProxyMiddleware({
  target: process.env.REACT_APP_API_BASE_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api',
  },
  prependPath: true,
});