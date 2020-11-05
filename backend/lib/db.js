const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'account',
    password: '12345'
})

connection.connect();
module.exports = connection;