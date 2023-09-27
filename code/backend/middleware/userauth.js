const express = require("express");
const db = require("../model");
const User = db.users;
const Session = db.sessions;

/**
 * middleware function to perform the checks before saving a user object
 * @param username -
 * @param email -
 * @returns {Promise<*>}
 * @async
 */
const saveUser = async (req, res, next) => {
    // search the database to see if user exist
    try {
        const username = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        //if username exist in the database respond with a status of 409
        if (username) {
            return res.status(409).send("username already taken");
        }

        //checking if email already exist
        const emailcheck = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        //if email exist in the database respond with a status of 409
        if (emailcheck) {
            return res.status(409).send("Authentication failed");
        }

        next();
    } catch (error) {
        console.log(error);
        return res.status(409).send("Authentication failed");
    }
};

/**
 * middleware function to verify the session is valid, and pass the user object on
 * @returns {Promise<*>}
 */

const validSession = async (req, res, next) => {
    // search the database to see if user exist
    try {
        const session = await Session.findOne({
            where: {
                token: req.cookies.jwt,
            },
        });

        // check that session exists and is not expired
        if (!session || session.dataValues.expires_at <= new Date()) {
            return res.status(409).send("Invalid or expired session");
        }

        const user = await User.findOne({
            where: {
                id: session.userid
            }
        });

        if (!user)
            return res.status(409).send("Missing user");

        res.locals.session = session;
        res.locals.user = user;

        next();
    } catch (error) {
        console.log(error);
        return res.status(409).send("Invalid or expired session");
    }
};

//export functions
module.exports = {
    saveUser,
    validSession
};