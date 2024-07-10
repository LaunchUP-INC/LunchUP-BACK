const { School } = require("../db");

const getSchool = async () => {
  const schools = await School.findAll();

  if(!schools) {
    throw new Error(`Error al obtener los colegios: ${error.message}`);
  }
  
  return schools;  
};

module.exports = getSchool;