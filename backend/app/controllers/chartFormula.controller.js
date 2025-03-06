const db = require("../models");
const ChartFormula = db.chartFormula;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate the request
    if (!req.body.chartName) {
        res.status(400).send({
            message: "Content can't be empty"
        });
        return;
    }

    // Create a chartEntry
    const chartFormula = {
        chartName: req.body.chartName,
        freeStreamsMultiplier: req.body.freeStreamsMultiplier,
        paidStreamsMultiplier: req.body.paidStreamsMultiplier,
        programmedStreamsMultiplier: req.body.programmedStreamsMultiplier,
        salesMultiplier: req.body.salesMultiplier,
        radioAudienceMultiplier: req.body.radioAudienceMultiplier,
    };

    ChartFormula.create(chartFormula)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            if (err.name === 'SequelizeUniqueConstraintError') {
                res.status(403).send({
                    message: "That chartName already exists"
                })
            }
            else {
                res.status(500).send({
                    message: err.message || "There was an error creating the chartFormula."
                });
            }
        });
}

exports.findAll = (req, res) => {
    const chartName = req.query.chartName ? req.query.chartName : "%%";

    ChartFormula.findAll({
        where: {
            chartName: { [Op.like]: chartName }
        }
    })
        .then(data => {
            if (data.size) {
                res.status(200).send(data);
            }
            else {
                res.status(404).send({
                    message: "A chart with that name does not exist"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred retrieving formulas."
            })
        })
}

exports.findOne = (req, res) => {
    const id = req.params.id;

    ChartFormula.findByPk(id)
        .then(data => {
            if (data) {
                res.status(200).send(data);
            }
            else {
                res.status(404).send({
                    message: `Chart formula with id=${id} does not exist.`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `An error occurred retrieving chart formula with id=${id}.`
            })
        });
}

exports.update = (req, res) => {
    const id = req.params.id;

    ChartFormula.update(
        req.body,
        { where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Chart formula was updated successfully."
                });
            }
            else {
                res.status(404).send({
                    message: `Cannot find chartFormula with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `An error occurred updating chart formula with id=${id}.`
            })
        });
}

exports.delete = (req, res) => {
    const id = req.params.id

    ChartFormula.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num === 1) {
                res.status(200).send({
                    message: "Chart formula was successfully deleted."
                });
            }
            else {
                res.status(404).send({
                    message: `Chart formula with id=${id} does not exist.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `An error occurred deleting chart formula with id=${id}.`
            })
        });
}