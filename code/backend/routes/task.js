const express = require("express");
const taskController = require("../controllers/task");
const { create, get, update, remove } = taskController;
const userAuth = require("../middleware/userauth");

const router = express.Router()

// Setup Task routes

// create route
router.post("/create", userAuth.validSession, create);

// create route
router.get("/get", userAuth.validSession, get);

// create route
router.post("/update", userAuth.validSession, update);

// delete route
router.delete("/delete", userAuth.validSession, remove);

module.exports = router