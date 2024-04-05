const jwt = require('jsonwebtoken');
const User = require('../models/User');
const SECRET_KEY=process.env.SECRET_KEY;

const authenticateUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

const authorizeUser = (role) => (req, res, next) => {
  if (req.user.role === role) {
    next();
  } else {
    res.status(403).send({ error: 'Access forbidden.' });
  }
};

module.exports = {
  authenticateUser,
  authorizeUser
};
