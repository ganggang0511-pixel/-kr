const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('<h1>Sevalla 部署成功！</h1>');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`运行在端口 ${port}`);
});
