const express = require("express");
const cors = require("cors");

const app = express();

let corsOptions = {
    origin: "http://localhost:8801"
};

app.use(cors(corsOptions));

const db = require("./app/models");
db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });
// Testing gitignore

// Parse requests of content-type application/json
app.use(express.json());

// Parse requests of content-type application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Simple test route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the ToyChart application"});
});

require("./app/routes/chartEntry.routes")(app);
require("./app/routes/chartFormula.routes")(app);

// Set port, listen for requests
const PORT = process.env.port || 8080;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`);
});