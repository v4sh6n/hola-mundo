const http = require('http');
const { spawn } = require('child_process');

let server;

beforeAll((done) => {
  server = spawn('ng', ['serve', '--port', '8080']);
  server.stdout.on('data', (data) => {
    if (data.includes('Development Server is listening on')) {
      done();
    }
  });
});

afterAll(() => {
  server.kill();
});

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


// const http = require('http');

// test('La respuesta de la petición HTTP es un 200 y el texto recibido es "Hola mundo"', (done) => {
//   http.get('http://localhost:8080', (res) => {
//     expect(res.statusCode).toBe(200);
//     let data = '';
//     res.on('data', (chunk) => {
//       data += chunk;
//     });
//     res.on('end', () => {
//       expect(data).toBe('Hola mundo');
//       done();
//     });
//   });
// });
