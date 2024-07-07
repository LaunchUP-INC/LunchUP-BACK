const loginController = require('../controllers/loginController');

const loginHandler = async (req, res) => {
  const { email, password } = req.query;
  try {
    const user = await loginController(email, password);
    return res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = loginHandler;