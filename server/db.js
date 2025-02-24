const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Tu usuario de MySQL
  password: 'karikama', // Tu contraseña de MySQL
  database: 'BaseNueva'
});

connection.connect(err => {
  if (err) {
    console.error('Error de conexión: ' + err.stack);
    return;
  }
  console.log('Conectado como ID ' + connection.threadId);
});

module.exports = connection;
