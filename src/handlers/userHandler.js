const {
  putUser,
  deleteUser,
  getAllUser,
  getUser,
  getUsersAdmin,
} = require("../controllers/userController");

const allUserHandler = async (req, res, next) => {
  try {
    const users = await getAllUser();
    return res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

const getUserHandler = async (req, res, next) => {
  const { email } = req.params;
  try {
    const users = await getUser(email);
    return res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

const getUserAdminHandler = async (req, res, next) => {
  try {
    const usersAdmin = await getUsersAdmin();
    res.status(200).json({ usersAdmin });
  } catch (error) {
    next(error);
  }
};

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
  allUserHandler,
  getUserHandler,
  putUserHandler,
  deleteUserHandler,
  getUserAdminHandler,
};
