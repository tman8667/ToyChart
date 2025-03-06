module.exports = app => {
    const chartEntries = require("../controllers/chartEntry.controller");

    let router = require("express").Router();

    // Create a new ChartEntry
    router.post("/", chartEntries.create);

    // Retrieve all ChartEntries with condition
    router.get ("/", chartEntries.findAll);

    // Get all chartDates for a certain chartName
    router.get("/getDates", chartEntries.findDates);

    // Retrieve a ChartEntry by id
    router.get("/:id", chartEntries.findOne);

    // Update a ChartEntry by id
    router.put("/:id", chartEntries.update);

    // Delete a ChartEntry by id
    router.delete("/:id", chartEntries.delete);

    app.use("/api/chartEntry", router);
}