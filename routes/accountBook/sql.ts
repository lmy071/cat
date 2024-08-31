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

sql.getDetail = `
SELECT DATE_FORMAT(date, '%Y-%m-%d %H:%i:%s') AS date,
(SELECT d.label FROM dict d WHERE d.value = ad.type and d.dictName = 'detailType' LIMIT 1) AS typeLabel,
(SELECT d.label FROM dict d WHERE d.value = ad.business and d.dictName = 'business' LIMIT 1) AS businessLabel,
(SELECT d.label FROM dict d WHERE d.value = ad.bigType and d.dictName = 'bigType' LIMIT 1) AS bigTypeLabel,
  money,notes,imgUrl,sort
FROM accounting_detail ad
WHERE userId = ?  
ORDER BY date DESC  
LIMIT 100;`


module.exports = sql