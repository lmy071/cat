const multer = require('multer');
const path = require('path');
const express = require("express");
var router = express.Router();


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
        const filename = userId+'-'+Date.now()  + extname     // 时间戳+后缀名 生成唯一文件名
        cb(null, filename)
    }
})


const upload = multer({ storage: storage })

router.post('/img', upload.single('image'),(req, res) => {
    const file = req.file
    if (!file) {
        return res.status(400).send('请选择要上传的图片')
    }
    const filePath = path.join(__dirname,  '../../../images/accountBook', req.file.filename);
    res.send({ message: '文件上传成功', filePath: filePath })

});

module.exports = router;