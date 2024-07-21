const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    'Order', 
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      items: {
        type: DataTypes.JSONB,
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, 
    {
    timestamps: true,
    }
  );
};
