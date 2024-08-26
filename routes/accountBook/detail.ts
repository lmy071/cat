var express = require("express");
var router = express.Router();
const sql = require('./sql.ts');
const sqlServe = require("../../utils/mysql.ts");

/* GET users listing. */
router.get("/get", function (req, res, next) {
  console.log('进入')
  sqlServe.connect((err) => {
    if (err){
      console.log(err)
      console.log("Connected to MySQL!");
    }

  });
  sqlServe.query(sql.get, [], (err, data) => {
    if (err) throw err;
    // sqlServe.end((err) => {
    //   if (err) throw err;
    //   console.log("MySQL connection closed.");
    // });
    res.send({
      code: 200,
      data
    });
  });



});

router.post("/set", function (req, res, next) {
  const values = ["value1", "value2"];
  sqlServe.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL!");
  });
  sqlServe.query(sql.get, values, (err, result) => {
    if (err) throw err;
    console.log("Last insert ID:", result.insertId);
  });

  sqlServe.end((err) => {
    if (err) throw err;
    console.log("MySQL connection closed.");
  });

  res.send("12respond with a resource");
});

module.exports = router;
