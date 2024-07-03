const {
  createUser,
  putUser,
  deleteUser,
  loginController,
} = require("../controllers/userController");

const createUserHandler = async (req, res) => {
  const { firstname, lastname, telephone, email, password, isAdmin } = req.body;

  try {
    const user = await createUser(
      firstname,
      lastname,
      telephone,
      email,
      password,
      isAdmin
    );
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const putUserHandler = async (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  try {
    const user = await putUser(id, userData);
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUserHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const userDelete = await deleteUser(id);
    res.status(200).json("Se eliminó el usuario con el ID: " + id);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginHandler = async (req, res) => {
  const { email, password } = req.query;
  try {
    const user = await loginController(email, password);
    return res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { 
  createUserHandler, 
  putUserHandler, 
  deleteUserHandler, 
  loginHandler 
};
