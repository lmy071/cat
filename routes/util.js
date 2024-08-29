var express = require("express");
var router = express.Router();
const sqlQuery = require("../utils/mysql.ts");

/* GET users listing. */
router.post("/getDict", function (req, res, next) {
    const s = 'select * from dict where dictName = ?'
    sqlQuery(s,[req.body.dictName])
        .then((data) => {
            res.send(data);
        })
});

module.exports = router;