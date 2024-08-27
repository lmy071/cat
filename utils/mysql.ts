const mysql = require('mysql2');

let connection = mysql.createConnection({
    host: '47.97.5.199',
    port:'3306',
    user: 'cat',
    password: 'lmy123456',
    database: 'cat'
})

connection.connect((err) => {
    if (err){
        console.log(err)
        console.log("Connected to MySQL!");
    }

});




const sqlQuery = (sql,value) => {
   return new Promise((resolve, reject) => {
       connection.query(sql, value, (err, data) => {
           if (err) throw err;
           resolve({
               code: 200,
               data
           })
       });
   })
}

module.exports = sqlQuery