const http = require('http');
const url = require('url');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (parsedUrl.pathname === '/weather') {
    const city = parsedUrl.query.city || 'bangkok';

    const fakeData = {
      city,
      temp_c: 28, // v2 เปลี่ยน temp ให้ต่างจาก v1 เฉยๆ
      condition: 'Cloudy (v2)', // ใส่ v2 ลงไปให้เห็นชัดๆ
      build: process.env.BUILD_VERSION || 'dev-v2',
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(fakeData));
  }

  if (parsedUrl.pathname === '/health') {
    res.writeHead(200);
    return res.end('OK - v2');
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(port, () => {
  console.log(`Weather service v2 running on port ${port}`);
});
