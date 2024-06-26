const {DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Vendedor = sequelize.define('vendedor', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        comidas: {
            type: DataTypes.STRING
        }
    })

    return vendedor
}
