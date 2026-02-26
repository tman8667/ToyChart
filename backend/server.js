const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

let corsOptions = {
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const db = require("./app/models");
db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

// Parse requests of content-type application/json
app.use(express.json());

// Parse requests of content-type application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

require("./app/routes/chartEntry.routes")(app);
require("./app/routes/chartFormula.routes")(app);

app.use(express.static(path.join(__dirname, "public")));

// Simple test route
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`);
});