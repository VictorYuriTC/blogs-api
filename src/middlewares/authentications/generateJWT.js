const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const generateNewJWT = (data) => {
  const jwtConfig = {
    expiresIn: '15d',
    algorithm: 'HS256',
  };
  
  const token = jwt.sign(
    { data },
    secret,
    jwtConfig,
  );

  return token;
};

module.exports = {
  generateNewJWT,
};
