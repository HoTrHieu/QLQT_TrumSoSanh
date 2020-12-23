const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const accessToken = req.headers['x-access-token'];
  if (accessToken) {
    try {
      // verify co the xay ra loi nen dung try catch de bat loi
      const decoded = jwt.verify(accessToken, 'TRUM_SO_SANH');
      req.accessTokenPayload = decoded; //day gia tri decoded vào req de ham sau lay ra xu ly
      // console.log(decoded);
      next();
    } catch (err) {
      // console.log(err);
      return res.status(401).json({
        message: 'Invalid access token.'
      });
    }
  } else {
    return res.status(400).json({
      message: 'access token not found.'
    })
  }
}
