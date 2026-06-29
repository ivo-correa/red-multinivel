const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.end('Hola, el puerto funciona!');
});

server.listen(4000, '127.0.0.1', () => {
  console.log('Servidor puro de Node escuchando en http://127.0.0.1:4000');
});