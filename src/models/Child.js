const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define('Child', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gradeLevel: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    timestamps: false
  })
};