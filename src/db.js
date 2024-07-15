require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false,
    native: false,
  }
);

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Dish, User, Child, Meal_Type, School, Review, Rating } =
  sequelize.models;

User.hasMany(Child);
Child.belongsTo(User);
School.hasMany(Child);
Child.belongsTo(School);
User.hasMany(Review);
Review.belongsTo(User);
User.hasMany(Rating);
Rating.belongsTo(User);
Dish.hasMany(Rating);
Rating.belongsTo(Dish);
Child.belongsToMany(Dish, { through: "Child_Dish" });
Dish.belongsToMany(Child, { through: "Child_Dish" });
Dish.belongsToMany(Meal_Type, { through: "Dish_MealTypes" });
Meal_Type.belongsToMany(Dish, { through: "Dish_MealTypes" });

module.exports = {
  Dish,
  User,
  Child,
  Meal_Type,
  School,
  Review,
  Rating,
  conn: sequelize,
};
