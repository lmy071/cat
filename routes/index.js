var express = require('express');
var router = express.Router();
var accountBook = require('./accountBook/index.ts');
var upload = require('./upload/index.js');
var user = require('./users.js');
var util = require('./util.js');
router.use('/accountBook', accountBook);
router.use('/upload', upload);
router.use('/user', user);
router.use('/util', util);
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
