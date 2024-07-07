const {
  createChild,
  putChild,
  deleteChild,
  selectChild,
} = require("../controllers/childController");

const createChildHandler = async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, gradeLevel } = req.body;
  try {
    const child = await createChild(firstname, lastname, gradeLevel, id);
    res.status(200).json({ child });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const putChildHandler = async (req, res) => {
  const { id } = req.params;
  const { firstname, lastname, gradeLevel } = req.body;
  try {
    const child = await putChild(id, firstname, lastname, gradeLevel);
    res.status(200).json({ child });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteChildHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const childDelete = await deleteChild(id);
    res.status(200).json("Se eliminó el perfil con el ID: " + id);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const selectChildHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const child = await selectChild(id);
    res.status(200).json(child);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createChildHandler,
  putChildHandler,
  deleteChildHandler,
  selectChildHandler,
};
