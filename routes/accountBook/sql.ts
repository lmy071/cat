const sql = {
    get: '',
    set:''
    
}
sql.set = `
INSERT INTO ACCOUNT_BOOK_DETAIL 
(column1, column2) 
VALUES
(?, ?)`

sql.get = `SELECT * FROM user;`


module.exports = sql