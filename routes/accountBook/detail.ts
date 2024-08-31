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

module.exports = router;
