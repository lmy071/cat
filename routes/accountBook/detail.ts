var express = require("express");
var router = express.Router();
const sql = require('./sql.ts');
const sqlQuery = require("../../utils/mysql.ts");

/* GET users listing. */
router.post("/get", function (req, res, next) {
    const params = [ Number(req.headers['userid'])]
    console.log(sql.getDetail,params)
    // console.log(sql.getDetail.replace(/?/g, () => `'${params.shift()}'`));
  sqlQuery(sql.getDetail,params)
      .then((data) => {
    res.send(data);
  })
});

router.post("/set", function (req, res, next) {
    const b = req.body;
    const v = [
        req.headers['userid'],
        b.money,
        b.type,
        b.date,
        b.business,
        b.bigType,
        b.notes,
        b.imgUrl,
        0
    ]
  sqlQuery(sql.setDetail,v)
      .then((data) => {
        res.send(data);
      })
});

router.post("/getDayTotal", function (req, res, next) {
    const b = req.body;
    const v = [
        b.day || 7,
        req.headers['userid'],
    ]
    sqlQuery(sql.getDayTotal,v)
        .then((data) => {
            const sumMoneyByDate = (data)=>{
                let sumByDate = {}; // 使用对象来存储每个日期的总金额

                // 遍历原始数据，累加每个日期的金额
                data.forEach(item => {
                    const date = item.date;
                    if (sumByDate[date]) {
                        sumByDate[date] += item.money;
                    } else {
                        sumByDate[date] = item.money;
                    }
                });

                // 提取日期和总金额到两个数组中
                const dates = Object.keys(sumByDate);
                const totalMoneys = Object.values(sumByDate);

                // 返回一个包含两个数组的对象
                return {
                    dates: dates,
                    totalMoneys: totalMoneys
                };
            }
            res.send(sumMoneyByDate(data.data));
        })
});

module.exports = router;
