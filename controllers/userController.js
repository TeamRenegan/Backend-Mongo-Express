const User = require('../models/User');

const signup = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findByCredentials(username, password);
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((tokenObj) => tokenObj.token !== req.token);
    await req.user.save();
    res.send({ message: 'Logged out successfully.' });
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

module.exports = {
  signup,
  login,
  logout
};
