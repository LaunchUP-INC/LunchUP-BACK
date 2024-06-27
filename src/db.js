require('dotenv').config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  logging: false,
  native: false,
});
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach(model => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Dish, User, Child, Meal_Type } = sequelize.models;

User.hasMany(Child);
Child.belongsTo(User);
Child.belongsToMany(Dish, { through: "Child_Dish" });
Dish.belongsToMany(Child, { through: "Child_Dish" });
Dish.belongsTo(Meal_Type);
Meal_Type.hasMany(Dish);

module.exports = {
  Dish,
  User,
  Child,
  Meal_Type,
  conn: sequelize,
};
