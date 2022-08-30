const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        domain: { type: DataTypes.STRING, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: true },
        ttl: { type: DataTypes.STRING, allowNull: false },
        type: { type: DataTypes.STRING, allowNull: false },
        record: { type: DataTypes.STRING, allowNull: false },
    };

    const options = {
    };

    return sequelize.define('DomainEntries', attributes, options);
}
