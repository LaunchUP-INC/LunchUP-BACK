const {
  putUser,
  deleteUser,
  getAllUser,
  getUser,
} = require("../controllers/userController");

const allUserHandler = async (req, res) => {
  try {
    const users = await getAllUser();
    return res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const users = await getUser(id);
    return res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const putUserHandler = async (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  try {
    const user = await putUser(id, userData);
    res.status(200).json({ userId: user.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUserHandler = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteUser(id);
    res.status(200).json({ deletedId: id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  allUserHandler,
  getUserHandler,
  putUserHandler,
  deleteUserHandler,
};
