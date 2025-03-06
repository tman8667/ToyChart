const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    const ChartFormula = sequelize.define("chartFormula", {
        chartName: {
            type: DataTypes.STRING,
            unique: true
        },
        freeStreamsMultiplier: {
            type: DataTypes.DOUBLE
        },
        paidStreamsMultiplier: {
            type: DataTypes.DOUBLE
        },
        programmedStreamsMultiplier: {
            type: DataTypes.DOUBLE
        },
        salesMultiplier: {
            type: DataTypes.DOUBLE
        },
        radioAudienceMultiplier: {
            type: DataTypes.DOUBLE
        }
    });

    return ChartFormula;
};

// Split of streaming tiers approx. 48% free, 45% paid, 7% programmed