const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const ChartEntry = sequelize.define("chartEntry", {
        chartName: {
            type: DataTypes.STRING
        },
        chartDate: {
            type: DataTypes.STRING
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
        points: {
            type: DataTypes.DOUBLE
        },
        imgURL: {
            type: DataTypes.STRING
        }
    });

    return ChartEntry;
};