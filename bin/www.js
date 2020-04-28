#!/usr/bin/env node

/**
 * Módulos necessários
 */

var app = require('../app');
var debug = require('debug')('05-express-first-app:server');
var http = require('http');

/**
 * Setando porta no Express
 */

var port = normalizePort(process.env.PORT || '21000');
app.set('port', port);

/**
 * Iniciando servidor HTTP
 */

var server = http.createServer(app);

/**
 * Configs porta
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Validando a porta
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Evento escutando servidor HTTP em busca de erro.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // Tratando erros com mensagens amigaveis
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Evento escutando servidor HTTP em busca de eventos.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
