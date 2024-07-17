const registerUser = require("../controllers/registerController");
const sendRegistrationEmail = require("../../brevoConfig.js");

const registerHandler = async (req, res, next) => {
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
    next(error);
  }
};

module.exports = registerHandler;
