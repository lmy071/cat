var express = require('express');
var router = express.Router();
var accountBook = require('./accountBook/index.ts');
var upload = require('./upload/index.js');
router.use('/accountBook', accountBook);
router.use('/upload', upload);
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;
