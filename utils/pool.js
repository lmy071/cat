// pool.js
const mysql = require('mysql2/promise');

let con = null
const connection = async () => {
    const c = await mysql.createConnection({
        host: '47.97.5.199',
        port: 3306,
        user: 'cat',
        password: 'lmy123456',
        database: 'cat',
        waitForConnections: true,
        connectionLimit: 10,
        maxIdle: 10, // 最大空闲连接数，默认等于 `connectionLimit`
        idleTimeout: 60000, // 空闲连接超时，以毫秒为单位，默认值为 60000 ms
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0,
    });
    con = c
    return c
}

class pool {
    con;
     constructor() {
        this.con =  connection()
    }

    async q(sql,query) {
        try{
            const [rows, fields] = await con.execute(sql,query);
            return {
                data:rows,
                code:200
            }
        }catch (e) {
            console.log(e)
        }
    }

    d(){

    }

    u(){

    }

    i(){

    }


}

module.exports = new pool()

