const registerUser = require('../controllers/registerController');

const registerHandler = async (req, res) => {
  const { firstname, lastname, telephone, email, password, isAdmin } = req.body;

  try {
    const user = await registerUser(
      firstname,
      lastname,
      telephone,
      email,
      password,
      isAdmin
    );
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = registerHandler;