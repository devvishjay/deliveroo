const jwt = require('jsonwebtoken');


function generateAccessToken(user) {
  const payload = {
    userId: user.id,
  };

  const expiresIn = '15m';

  const accessToken = jwt.sign(payload, process.env.JWT_KEY, { expiresIn });

  return accessToken;
}

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization').split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Authentication required' });


  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    console.log(user)
    if (err) {
      if (err.name === 'TokenExpiredError') {
        const decodedToken = jwt.decode(token, { complete: true });
        const newAccessToken = generateAccessToken(decodedToken.payload.customerId ? decodedToken.payload.customerId : decodedToken.payload.userId);
        res.setHeader('Authorization', `Bearer ${newAccessToken}`);
        req.user = decodedToken.payload;
       return next();
      } else {
        return res.status(403).json({ error: 'Invalid token' });
      }
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
