const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Review",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [2, 300],
          is: /^[a-zA-Z0-9,.](?:[a-zA-Z0-9,.\s]*[a-zA-Z0-9,.])?$/,
        },
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 1,
          max: 5,
        },
      },
    },
    {
      timestamps: false,
    }
  );
};
