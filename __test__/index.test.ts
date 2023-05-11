const http = require('http');

test('La respuesta de la petición HTTP es un 200 y el texto recibido es "Hola mundo"', (done) => {
  http.get('http://localhost:8080', (res) => {
    expect(res.statusCode).toBe(200);
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      expect(data).toBe('Hola mundo');
      done();
    });
  });
});
