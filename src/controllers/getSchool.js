const { School } = require("../db");
const { NotFoundError } = require("../errors/customErrors");

const getSchool = async () => {
  const schools = await School.findAll();

  if (!schools) {
    throw new NotFoundError(`Colegios no encontrados`);
  }

  return schools;
};

module.exports = getSchool;
