const {
  createChild,
  putChild,
  deleteChild,
  selectChild,
  selectAllChild,
  markFavoriteDishes,
} = require("../controllers/childController");

const { ValidationError, DatabaseError } = require("../errors/customErrors");

const createChildHandler = async (req, res, next) => {
  const { id } = req.params;
  const { firstname, lastname, gradeLevel, schoolId } = req.body;
  try {
    const child = await createChild(
      firstname,
      lastname,
      gradeLevel,
      id,
      schoolId,
    );
    res.status(200).json({ child });
  } catch (error) {
    if (error instanceof ValidationError) {
      next(error);
    } else {
      next(new DatabaseError("Error al crear el usuario"));
    }
  }
};

const putChildHandler = async (req, res, next) => {
  const { id } = req.params;
  const { firstname, lastname, gradeLevel } = req.body;
  try {
    const child = await putChild(id, firstname, lastname, gradeLevel);
    res.status(200).json({ child });
  } catch (error) {
    next(error);
  }
};

const deleteChildHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const childDelete = await deleteChild(id);
    res.status(200).json("Se eliminó el perfil con el ID: " + id);
  } catch (error) {
    next(new DatabaseError("Error al eliminar el usuario"));
  }
};

const selectChildHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const child = await selectChild(id);
    res.status(200).json(child);
  } catch (error) {
    next(error);
  }
};

const allChildHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const childs = await selectAllChild(id);
    res.status(200).json(childs);
  } catch (error) {
    next(error);
  }
};

const favoriteDishesHandler = async (req, res, next) => {
  const { id } = req.params;
  const { dishIds } = req.body;
  try {
    const result = await markFavoriteDishes(id, dishIds);
    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createChildHandler,
  putChildHandler,
  deleteChildHandler,
  selectChildHandler,
  allChildHandler,
  favoriteDishesHandler,
};
