const { loginController } = require("../controllers/loginController");
const { verifyToken } = require("../utils/jwt");

const loginHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginController(email, password);

    const token = verifyToken(email, password);

    res.cookie("token", token, { httpOnly: true });
    res.status(200).json("Inicio de sesión exitosa");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = loginHandler;
