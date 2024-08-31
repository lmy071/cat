const multer = require('multer');
const path = require('path');
const express = require("express");
const sqlQuery = require("../../utils/mysql.ts");
const sql = require("../accountBook/sql.ts");
var router = express.Router();
const {formatDate} = require("../../utils/util.ts")

// 设置文件存储的目录

// diskStorage创建上传存储器
const storage = multer.diskStorage({
    // 设置上传文件存储目录
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname,  '../../../images/accountBook'))
    },
    //保存在 uploads 中的文件名
    filename: function (req, file, cb) {
        const userId = req.header('userId') || 'null'
        const extname = path.extname(file.originalname) // 获取文件后缀名
        const filename = userId+'-'+formatDate(new Date())  + extname     // 时间戳+后缀名 生成唯一文件名
        cb(null, filename)
    }
})


const upload = multer({ storage: storage })

router.post('/img', upload.single('image'),(req, res) => {
    const file = req.file
    if (!file) {
        return res.status(400).send('请选择要上传的图片')
    }
    const baseUrl = 'http://47.97.5.199:80'
    const filePath =baseUrl+ '/images/accountBook/' +req.file.filename;
    // const sql = 'INSERT INTO accounting_detail (imgUrl) VALUES (?)'
    // sqlQuery(sql,[filePath])
    //     .then((data) => {
    //         res.send(data);
    //     })

    res.status(200).send({ message: '图片上传成功', imgUrl: filePath })

});

module.exports = router;