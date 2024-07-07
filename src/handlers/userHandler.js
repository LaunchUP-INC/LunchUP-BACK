const {
  putUser,
  deleteUser,
} = require("../controllers/userController");

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
  putUserHandler, 
  deleteUserHandler, 
};
