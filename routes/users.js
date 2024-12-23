var express = require('express');
var router = express.Router();
const pool = require("../utils/pool.js");
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
/* GET users listing. */
router.post('/login', async function(req, res, next) {
  const { username, password } = req.body;
  try {
    // 查找用户
    const row = await  pool.q('SELECT * FROM user WHERE id = ?', [username]);
    const user = row.data[0]
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    // 验证密码
    // const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = password === user.password
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    console.log(user)

    // 生成 token
    const token = jwt.sign({ id: user.id }, 'lm_21_lmy_29_lmy2129', { expiresIn: 60 * 60 * 24 * 30 * 1000 });
    // 更新用户的 token 和过期时间
    const tokenExpires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 天后过期
    console.log([token, tokenExpires,new Date(),new Date(), user.id])

    await pool.q('UPDATE user SET token = ?, tokenExpires = ? ,lastLoginTime = ?,updatedTime = ? WHERE id = ?',[token, tokenExpires,new Date(),new Date(), user.id] );

    res.json({ token,userId: user.id });
  } catch (err) {
    res.status(500).json({ message: err });
  }


});

module.exports = router;
