const {
  registerUser,
  checkUser,
} = require("../controllers/registerController");
const sendRegistrationEmail = require("../../brevoConfig.js");

const registerHandler = async (req, res, next) => {
  const { firstname, lastname, telephone, email, password, banned } = req.body;

  try {
    const user = await registerUser(
      firstname,
      lastname,
      telephone,
      email,
      password,
      banned,
    );

    await sendRegistrationEmail(email, firstname);
    res.status(200).json({ newId: user.id });
  } catch (error) {
    next(error);
  }
};

const checkUserHandler = async (req, res, next) => {
  try {
    const { email } = req.body;
    const isRegistered = await checkUser(email);

    res.json({ isRegistered });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerHandler,
  checkUserHandler,
};
