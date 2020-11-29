module.exports = function (sequelize, DataTypes) {
    const Log = sequelize.define('log', {
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        definition: {
            type: DataTypes.STRING,
            allowNull: false
        },
        result: {
            type: DataTypes.STRING,
            allowNull: false
        },
        owner: {
            type: DataTypes.INTEGER
        }
    })
    return Log;
};