const db = require("./model");

function wipeDB() {
    db.sequelize.sync({ force: true }).then(() => {
        console.log("db has been wiped")
    });
}

wipeDB();