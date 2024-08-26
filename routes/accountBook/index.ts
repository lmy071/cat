var express = require('express');
var router = express.Router();

var detail = require('./detail.ts');

router.use('/detail', detail);

module.exports = router;
