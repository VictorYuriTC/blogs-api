const jwt = require('jsonwebtoken');
const userService = require('../../services/user.service');

require('dotenv/config');

const secret = process.env.JWT_SECRET;

const validateJWT = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Token não encontrado ' });
  }

  try {
    const decoded = jwt.verify(token, secret);

    const user = await userService.addNewUserByEmail(decoded.data.email);

    if (!user) {
      return res.status(401).json({ message: 'Erro ao procurar usuário do token' });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Eu hein' });
  }
};

module.exports = validateJWT;