const {
  registerUser,
  checkUser,
} = require("../controllers/registerController");
const sendRegistrationEmail = require("../../brevoConfig.js");
const { ValidationError } = require("../errors/customErrors");

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

const checkUserHandler = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      next(new ValidationError("Error al verificar el token"));
    }

    const token = authHeader.split(" ")[1];
    const isRegistered = await checkUser(token);

    res.json({ isRegistered });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerHandler,
  checkUserHandler,
};
