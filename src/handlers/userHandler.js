const {
  registerController,
  loginController,
} = require("../controllers/userController");

const registerHandler = async (req, res) => {
  const { firstname, lastname, telephone, email, password } = req.body;

  try {
    const user = await registerController(
      firstname,
      lastname,
      telephone,
      email,
      password
    );
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginHandler = async (req, res) => {
  const { email, password } = req.query;
  try {
    const user = await loginController(email, password);
    return res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { registerHandler, loginHandler };