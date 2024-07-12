const { loginController } = require("../controllers/loginController");
const { loginToken } = require("../utils/jwt");

const loginHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginController(email, password);

    const token = loginToken(email);

    res.header("authorization", token);
    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ username: req.user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = loginHandler;
