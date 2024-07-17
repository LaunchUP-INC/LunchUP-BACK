const { putUser, deleteUser } = require("../controllers/userController");

const putUserHandler = async (req, res, next) => {
  const { id } = req.params;
  const userData = req.body;
  try {
    const user = await putUser(id, userData);
    res.status(200).json({ userId: user.id });
  } catch (error) {
    next(error);
  }
};

const deleteUserHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    await deleteUser(id);
    res.status(200).json({ deletedId: id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  putUserHandler,
  deleteUserHandler,
};
