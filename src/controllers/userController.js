const { User } = require("../db");

const registerController = async (
  firstname,
  lastname,
  telephone,
  email,
  password
) => {
  try {
    //const userExisting = await User.findOne({ where: { email } });
    //if (userExisting) {
    //  throw new Error("User already exists");
    //}
    //if (!firstname || !lastname || !telephone || !email || !password) {
    // throw new Error("All fields must be complete");
    //}
    const newUser = await User.create({
      firstname,
      lastname,
      telephone,
      email,
      password,
    });
    //console.log(newUser);
    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { registerController };
