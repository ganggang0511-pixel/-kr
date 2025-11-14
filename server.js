const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = process.env.PORT || 3000;

// === 1. HTTP 代理（浏览器 / Clash / Surge）===
app.use('/proxy', createProxyMiddleware({
  target: 'http://www.google.com', // 可替换为任意目标
  changeOrigin: true,
  pathRewrite: { '^/proxy': '' },
  onProxyReq: (proxyReq) => {
    proxyReq.setHeader('User-Agent', 'Mozilla/5.0');
  }
}));

// === 2. WebSocket 代理（V2Ray / Trojan）===
app.use('/ws', createProxyMiddleware('ws://', {
  target: 'ws://example.com', // 替换为你的 WS 目标
  ws: true,
  changeOrigin: true
}));

// === 3. 健康检查（Sevalla 必须）===
app.get('/', (req, res) => {
  res.send(`
    <h1>Sevalla 代理节点已就绪！</h1>
    <hr>
    <p><b>HTTP 代理：</b> <code>GET ${req.protocol}://${req.get('host')}/proxy/...</code></p>
    <p><b>WS 代理：</b> <code>wss://${req.get('host')}/ws</code></p>
    <p>配置到 Clash / V2Ray / Surge 即可使用</p>
  `);
});

// 必须绑定 0.0.0.0
app.listen(port, '0.0.0.0', () => {
  console.log(`代理节点运行在端口 ${port}`);
});const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('<h1>Sevalla 部署成功！</h1>');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`运行在端口 ${port}`);
});
