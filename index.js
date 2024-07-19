const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const populateMealTypes = require("./src/scripts/populateMealTypesTable.js");
const populateDishes = require("./src/scripts/populateDishesTable.js");
const populateSchools = require("./src/scripts/populateSchoolsTable.js");
const populateUsers = require("./src/scripts/populateUsersTables.js");
const populateChildren = require("./src/scripts/populateChildrenTable.js");
const populateReviews = require("./src/scripts/populateReviewsTable.js");

const startServer = async () => {
  try {
    await conn.sync({ alter: true });
    await populateMealTypes();
    await populateDishes();
    await populateSchools();
    await populateUsers();
    await populateReviews();
    await populateChildren();

    server.listen(3001, () => {
      console.log("%s listening at http://localhost:3001", server.name);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
};

startServer();
