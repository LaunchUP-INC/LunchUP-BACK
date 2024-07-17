const { registerManualUser, registerAuth0User } = require("../controllers/registerController");
const sendRegistrationEmail = require("../../brevoConfig.js");

const registerManualHandler = async (req, res) => {
  const { firstname, lastname, telephone, email, password, isAdmin } = req.body;

  try {
    const user = await registerManualUser(
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

const registerAuth0Handler = async (req, res) => {
  try {
    const { token } = req.body;
    const user = await registerAuth0User(token);

    await sendRegistrationEmail(email, firstname);
    res.json({ id: user.id, email: user.email, firstname: user.firstname, lastname: user.lastname });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerManualHandler,
  registerAuth0Handler
}
