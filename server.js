const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('<h1>Hello from Sevalla Node! 部署成功！</h1><p>端口: ' + port + '</p>');
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
