const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const userModel = require('../models/user.model');

const router = express.Router();

// login user
router.post('/', async function (req, res) {
  const user = await userModel.singleByUserName(req.body.username);
  if (user === null) {
    return res.json({
      authenticated: false
    });
  }

  if (!bcrypt.compareSync(req.body.password, user.password)) {
    return res.json({
      authenticated: false
    });
  }

  const accessToken = jwt.sign({
    userId: user.id
  }, 'SECRET_KEY', {
    expiresIn: 10 * 60 // seconds
  });

  const refreshToken = randomstring.generate();
  await userModel.updateRefreshToken(user.id, refreshToken);

  res.json({
    authenticated: true,
    accessToken,
    refreshToken
  })
})

// body co thong tin thi deu day qua schema xem co dung hay khong
// ajv để check body có đủ //   accessToken,  //   refreshToken
router.post('/refresh', async function (req, res) {
  // req.body = {
  //   accessToken,
  //   refreshToken
  // }

  console.log('show boday', req.body)
  const { accessToken, refreshToken } = req.body;
  const { userId } = jwt.verify(accessToken, 'TRUM_SO_SANH', {
    ignoreExpiration: true // verify xem co dung la do truoc day tao ra hay khong, đúng thì sẽ tra info
  });

  const ret = await userModel.isValidRefreshToken(userId, refreshToken);
  if (ret === true) {
    const newAccessToken = jwt.sign({ userId }, 'TRUM_SO_SANH', { expiresIn: 60 * 10 });
    return res.json({
      accessToken: newAccessToken
    })
  }

  res.status(400).json({
    message: 'Invalid refresh token.'
  })
})

module.exports = router;