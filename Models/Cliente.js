const {DATATYPES} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const cliente = sequelize.define('cliente', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        nombre: {
            type: DataTypes.STRING
        },
        apellidos: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        saldo: {
            type: DataTypes.INTEGER
        },
        admin: {
            type: DataTypes.BOOLEAN
        }
    }, {
        timestamps: false
    }); 

    return cliente;
}