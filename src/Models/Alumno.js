const {DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Alumno = sequelize.define('alumno', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING
        },
        saldo: {
            type: DataTypes.FLOAT
        },
        compra: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false
    });
    return Alumno;
}