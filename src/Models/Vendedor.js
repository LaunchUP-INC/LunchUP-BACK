const {DATATYPE} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('vendedores', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING
        }
    });
}
