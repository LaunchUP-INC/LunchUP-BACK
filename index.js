const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const populateMealTypes = require('./src/scripts/populateMealTypesTable.js');

const startServer = async () => {
  try {
    await conn.sync({ force: true });
    await populateMealTypes();
    server.listen(3001, () => {
      console.log('%s listening at http://localhost:3001', server.name);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
};

startServer();


