module.exports = app => {
    const chartFormulas = require("../controllers/chartFormula.controller");

    let router = require("express").Router();

    // Create a new ChartFormula
    router.post("/", chartFormulas.create);

    // Retrieve all ChartFormulas
    router.get ("/", chartFormulas.findAll);

    // Retrieve a ChartFormula by id
    router.get("/:id", chartFormulas.findOne);

    // Update a ChartFormula by id
    router.put("/:id", chartFormulas.update);

    // Delete a ChartFormula by id
    router.delete("/:id", chartFormulas.delete);

    app.use("/api/chartFormula", router);
}