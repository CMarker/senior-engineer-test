const bcrypt = require("bcrypt");
const db = require("../model");
const env = require("../env");

const Task = db.tasks;

/**
 * Creates a task
 * @param {string} title - The title of the task.
 * @param {string} description - The description of the task.
 * @param {string} due_date - The due date of the task.
 * @param {string} status - The status of the task. (open / complete)
 * @param {string} priority - The priority of the task. (low / normal / high / critical)
 * @async
 * */
const create = async (req, res) => {
    try {
        const user = res.locals.user;

        const { title, description, due_date, status, priority } = req.body;
        const data = {
            userid: user.id,
            title,
            description,
            due_date,
            status,
            priority
        };
        //saving the user
        const task = await Task.create(data);

        return res.status(201).send(task);
    } catch (error) {
        console.log(error);
        return res.status(401).send({err: "Create task failed"});
    }
}

/**
 * Gets all tasks
 * @async
 * */
const get = async (req, res) => {
    try {
        const user = res.locals.user;

        const tasks = await Task.findAll({
            where: {
                userid: user.id
            }
        })

        return res.status(200).send(tasks);
    } catch (error) {
        console.log(error);
        return res.status(401).send({err: "Get tasks failed"});
    }
}

/**
 * Updates a task
 * @param {string} title - The title of the task.
 * @param {string} description - The description of the task.
 * @param {string} due_date - The due date of the task.
 * @param {string} status - The status of the task. (open / complete)
 * @param {string} priority - The priority of the task. (low / normal / high / critical)
 * @param {number} id - The id of the task.
 * @async
 * */
const update = async (req, res) => {
    try {
        const user = res.locals.user;
        const { title, description, due_date, status, priority, id } = req.body;

        const task = await Task.findOne({
            where: {
                id
            }
        });

        const valid_options = ["title", "description", "due_date", "status", "priority"]; // only allow a certain set of fields to be edited
        for (let x=0;x<valid_options.length;x++) {
            const param = valid_options[x];
            if (!req.body[param]) continue; // skip fields that aren't set in the request
            task[param] = req.body[param]; // update value
        }

        await task.save();

        return res.status(200).send(task);
    } catch (error) {
        console.log(error);
        return res.status(401).send({err: "Update task failed"});
    }
}

/**
 * Deletes a task
 * @param {number} id - The id of the task.
 * @async
 * */
const remove = async (req, res) => {
    try {
        const user = res.locals.user;
        const { id } = req.body;

        const task = await Task.findOne({
            where: {
                id
            }
        });

        await task.destroy();

        return res.status(200).send({});
    } catch (error) {
        console.log(error);
        return res.status(401).send({err: "Remove task failed"});
    }
}

module.exports = {
    create,
    get,
    update,
    remove
};