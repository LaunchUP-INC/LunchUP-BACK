const { registerUser, checkUser } = require("../controllers/registerController");
const sendRegistrationEmail = require("../../brevoConfig.js");

const registerHandler = async (req, res) => {
  const { firstname, lastname, telephone, email, password, isAdmin } = req.body;

  try {
    const user = await registerUser(
      firstname,
      lastname,
      telephone,
      email,
      password,
      isAdmin,
    );

    await sendRegistrationEmail(email, firstname);
    res.status(200).json({ newId: user.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const checkUserHandler = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "No se encontró el token"});
    }

    const token = authHeader.split(" ")[1];
    const isRegistered = await checkUser(token);

    res.json({ isRegistered });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerHandler,
  checkUserHandler
}

