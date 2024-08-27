const sql = {
    getDetail: '',
    setDetail:'',
    accountingDetail:[],
    q :(table,list)=>{
        return `
INSERT INTO ${table} 
(${ list.join(', ')}) 
VALUES
(list.map(() => '?').join(','))`
    },
    s :(table,list)=>{
        return `
INSERT INTO ${table} 
(${ list.join(', ')}) 
VALUES
(list.map(() => '?').join(','))`
    },

    
}

const accounting_detail  = [
    // 'id',
    'userId','money','type','date','business','bigType','notes','imgUrl','sort'
]



sql.setDetail = `
INSERT INTO accounting_detail 
(${ accounting_detail.join(', ')}) 
VALUES
(${accounting_detail.map(() => '?').join(',')})`

sql.getDetail = `SELECT * FROM user;`


module.exports = sql