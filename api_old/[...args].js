import { createProxyMiddleware } from 'http-proxy-middleware';

export default createProxyMiddleware({
  target: process.env.BACKEND_API_DOMAIN,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/',
  },
  prependPath: true,
});