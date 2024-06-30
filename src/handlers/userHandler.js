const { registerController } = require("../controllers/userController");

const registerHandler = async (req, res) => {
  const { firstname, lastname, telephone, email, password } = req.body;
  //const userExisting = await User.findOne({ where: { email } });
  //if (userExisting)
  // return res.status(400).json({ message: "User already exists" });
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

//loginHandler;

module.exports = { registerHandler };
