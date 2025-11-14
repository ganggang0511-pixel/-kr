// server.js —— 完整 VMess 服务器
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { VMessServer } = require('vmess-websocket');

const app = express();
const port = process.env.PORT || 3000;

// 1. VMess over WebSocket
const vmess = new VMessServer({
  uuid: 'f570b4ae-bb3e-498f-8337-1a6c512821b5',
  alterId: 0,
  network: 'ws',
  path: '/ws'
});
app.use('/ws', vmess.handler());

// 2. HTTP 代理（备用）
app.use('/proxy', createProxyMiddleware({
  target: 'http://www.google.com',
  changeOrigin: true,
  pathRewrite: { '^/proxy': '' }
}));

// 3. 健康检查
app.get('/', (req, res) => {
  res.send(`
    <h1>Sevalla VMess 节点已启动！</h1>
    <p>VMess: wss://my-node-ho5lk.sevalla.app/ws</p>
    <p>HTTP: https://my-node-ho5lk.sevalla.app/proxy</p>
  `);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`VMess 节点运行在 ${port}`);
});
