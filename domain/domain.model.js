const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        domain: { type: DataTypes.STRING, allowNull: false },
        domhand: { type: DataTypes.STRING, allowNull: false },
    };

    const options = {};

    return sequelize.define('Domain', attributes, options);
}
