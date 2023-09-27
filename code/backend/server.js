const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const env = require("./env");
const db = require("./model");

let hosts;
const PORT = process.env.PORT || env.port || 8080; // set port from process env var or env file or default

setupDB(); // set up the db

const app = express();
setupExpress(); // set up express

app.listen(PORT, () => {
    console.log(`Server is connected on:`);
    hosts.forEach((host) => {
        console.log(host);
    });
});

/**
 * Set up database
 */
function setupDB() {
    db.sequelize.sync({ alter: true }).then(() => {
        console.log("db has been re sync")
    });
}

/**
 * Setup express middleware
 */
function setupExpress() {
    app.use(express.json());
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));

    setupCors();
    setupRoutes();
}

/**
 * Setup routes
 */
function setupRoutes() {
    // api routes
    app.use("/api/users", require ("./routes/user")); // add the user api endpoints
    app.use("/api/tasks", require ("./routes/task")); // add the task api endpoints

    // set up for react file hosting
    app.use("/static", express.static(path.join(__dirname, "../frontend/build//static"))); // serve static folder
    app.get("*", function(req, res) { // catch all other urls
        const rootFolder = path.join(__dirname, "../frontend/build/");
        const localFilename = rootFolder + req.url; // generate a local filename to check
        if (fs.existsSync(localFilename) && fs.lstatSync(localFilename).isFile()) { // check the filename exists and is a file (not a folder)
            return res.sendFile(req.url, {root: rootFolder}); // send the file
        }
        res.sendFile("index.html", {root: rootFolder}); // default to the index file and send it
    });
}

/**
 * Setup cors
 */
function setupCors() {
    // get a list of addresses the server is listening on
    hosts = Object.values(require("os").networkInterfaces()).reduce((r, list) => r.concat(list.reduce((rr, i) => rr.concat(i.family==="IPv4" && i.address || []), [])), []);
    hosts.push("localhost"); // add global host
    hosts = hosts.map((host) => `http://${host}:${PORT}`); // format the ip into a full url
    app.use(cors({ credentials: true, origin: hosts})); // set them as allowed cors origins
}