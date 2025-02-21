const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const ChartEntry = sequelize.define("chartEntry", {
        chartName: {
            type: DataTypes.STRING
        },
        chartDate: {
            type: DataTypes.DATEONLY
        },
        song: {
            type: DataTypes.STRING
        },
        artist: {
            type: DataTypes.STRING
        },
        freeStreams: {
            type: DataTypes.INTEGER
        },
        paidStreams: {
            type: DataTypes.INTEGER
        },
        programmedStreams: {
            type: DataTypes.INTEGER
        },
        sales: {
            type: DataTypes.INTEGER
        },
        radioAudience: {
            type: DataTypes.INTEGER
        },
        imgURL: {
            type: DataTypes.STRING
        }
    });

    return ChartEntry;
};