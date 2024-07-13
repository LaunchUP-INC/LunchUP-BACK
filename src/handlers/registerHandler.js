const registerUser = require("../controllers/registerController");
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

module.exports = registerHandler;
