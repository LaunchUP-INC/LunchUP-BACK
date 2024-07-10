const { School } = require("../db");

const schools = [
  { name: 'Colegio Uno' },
  { name: 'Colegio Dos' },
  { name: 'Colegio Tres' },
  { name: 'Colegio Cuatro' },
  { name: 'Colegio Cinco'}
];

const populateSchools = async () => {
  try {
    await School.sync({ force: true });
    await School.bulkCreate(schools);
  } catch (error) {
    console.error('Error al popular la tabla de colegios:', error);
  } 
};

module.exports = populateSchools;