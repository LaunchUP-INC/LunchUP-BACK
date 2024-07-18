const { loginController } = require("../controllers/loginController");

const loginHandler = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const { access, token } = await loginController(email, password);

    if (access) {
      res.status(200).json({ access, token });
    } else {
      res.status(401).json({ access });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = loginHandler;
