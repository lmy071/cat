const mysql = require('mysql2');

let config = mysql.createConnection({
    host: '47.97.5.199',
    port:3306,
    user: 'cat',
    password: 'lmy123456',
    database: 'cat'
})
module.exports = config
