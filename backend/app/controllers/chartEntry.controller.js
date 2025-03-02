const db = require("../models");
const ChartEntry = db.chartEntry;
const Op = db.Sequelize.Op;

// Create and Save a new chartEntry
exports.create = (req, res) => {
    // Validate the request
    if (!req.body.chartName) {
        res.status(400).send({
            message: "Content can't be empty"
        });
        return;
    }

    // Create a chartEntry
    const chartEntry = {
        chartName: req.body.chartName,
        chartDate: req.body.chartDate,
        song: req.body.song,
        artist: req.body.artist,
        freeStreams: req.body.freeStreams,
        paidStreams: req.body.paidStreams,
        programmedStreams: req.body.programmedStreams,
        sales: req.body.sales,
        radioAudience: req.body.radioAudience,
        points: req.body.points,
        imgURL: req.body.imgURL
    };

    ChartEntry.create(chartEntry)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred."
            });
        });
};

// Retrieve all ChartEntries from the database matching parameters
// TODO: Add ability to find all chartNames
exports.findAll = (req, res) => {
    const chartName = req.query.chartName;
    const chartDate = req.query.chartDate;
    const song = req.query.song ? req.query.song : "";
    const artist = req.query.artist ? req.query.artist : "";

    ChartEntry.findAll({
        where: [
            { chartName: { [Op.like]: chartName } },
            { chartDate: { [Op.like]: chartDate } },
            { song: { [Op.like]: `%${song}%` } },
            { artist: { [Op.like]: `%${artist}%` } }
        ],
    })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "An error occurred retrieving entries."
            })
        });
};

// Find a single ChartEntry with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    ChartEntry.findByPk(id)
        .then(data => {
            if (data) {
                res.status(200).send(data);
            }
            else {
                res.status(404).send({
                    message: `Chart entry with id=${id} does not exist.`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `An error occurred retrieving chart entry with id=${id}.`
            })
        });
};

// Update a ChartEntry by the id
exports.update = (req, res) => {
    const id = req.params.id;

    ChartEntry.update(
        req.body,
        { where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Chart entry was updated successfully."
                });
            }
            else {
                res.status(404).send({
                    message: `Cannot find chartEntry with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `An error occurred updating chart entry with id=${id}.`
            })
        });
};

// Delete a ChartEntry with the specified id
exports.delete = (req, res) => {
    const id = req.params.id

    ChartEntry.destroy({
        where: {id: id}
    })
        .then(num => {
            if (num === 1) {
                res.status(200).send({
                    message: "Chart entry was successfully deleted."
                });
            }
            else {
                res.status(404).send({
                    message: `Chart entry with id=${id} does not exist.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `An error occurred deleting chart entry with id=${id}.`
            })
        });
};