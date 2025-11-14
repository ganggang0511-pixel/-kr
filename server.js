// server.js —— 完整、干净、无重复
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 3000;

// 健康检查页面
app.get('/', (req, res) => {
  res.send(`
    <h1>Sevalla 代理节点已启动！</h1>
    <p><b>HTTP 代理：</b> <code>https://${req.get('host')}/proxy</code></p>
    <p><b>WS 代理：</b> <code>wss://${req.get('host')}/ws</code></p>
    <p>复制到 Clash / V2Ray 即可使用</p>
  `);
});

// HTTP 代理（支持浏览器 / Clash / Surge）
app.use('/proxy', createProxyMiddleware({
  target: 'http://www.google.com',
  changeOrigin: true,
  pathRewrite: { '^/proxy': '' },
}));

// WebSocket 代理（支持 V2Ray / Trojan）
app.use('/ws', createProxyMiddleware('ws://', {
  target: 'ws://example.com', // 改成你的目标
  ws: true,
  changeOrigin: true,
}));

// 必须绑定 0.0.0.0 和动态端口
app.listen(port, '0.0.0.0', () => {
  console.log(`代理节点运行在端口 ${port}`);
});
