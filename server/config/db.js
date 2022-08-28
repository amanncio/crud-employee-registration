const mysql = require("mysql");

const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'amancio',
    password : 'amancio',
    database : 'employee_system'
}) 

module.exports = db;
//testando...