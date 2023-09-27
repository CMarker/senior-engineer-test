const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../model");
const env = require("../env");

const User = db.users;
const Session = db.sessions;

const SESSION_LENGTH = 3 * 24 * 60 * 60; // set a default session length of 3 days

/**
 * Sign up a user
 * @param {string} username - The username of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user (sha-512 hashed).
 * @async
 */
const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const data = {
            username,
            email,
            password: await bcrypt.hash(password, 10)
        };
        //saving the user
        const user = await User.create(data);

        //if user details is captured
        //generate token with the user's id and the secretKey in the env file
        // set cookie with the token generated
        if (user) {
            delete user.dataValues.password; // remove field before sending to client
            let token = jwt.sign({ id: user.id }, env.secretKey, {
                expiresIn: SESSION_LENGTH * 1000,
            });

            const [session, createdSession] = await Session.findOrCreate({
                where: {userid: user.id},
                defaults: {
                    token,
                    expires_at: new Date(new Date().getTime() + SESSION_LENGTH * 1000)
                }
            });
            session.token = token;
            session.expires_at = new Date(new Date().getTime() + SESSION_LENGTH * 1000);
            await session.save();

            res.cookie("jwt", token, { maxAge: SESSION_LENGTH * 1000, httpOnly: true });

            //console.log("user", JSON.stringify(user, null, 2));
            //console.log(token);

            return res.status(201).send(user); //send users details
        } else {
            return res.status(400).send("Details are not correct"); // fail and send error message
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send(error.message);
    }
};

/**
 * Login a user
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user (sha-512 hashed).
 * @async
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //find a user by their email
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        //if user email is found, compare password with bcrypt
        if (user) {
            const isSame = await bcrypt.compare(password, user.password);
            delete user.dataValues.password; // remove before sending to client

            //if password is the same
            //generate token with the user's id and the secretKey in the env file

            if (isSame) {
                let token = jwt.sign({ id: user.id }, env.secretKey, {
                    expiresIn: SESSION_LENGTH * 1000,
                });

                const [session, createdSession] = await Session.findOrCreate({
                    where: {userid: user.id},
                    defaults: {
                        token,
                        expires_at: new Date(new Date().getTime() + SESSION_LENGTH * 1000)
                    }
                });
                session.token = token;
                session.expires_at = new Date(new Date().getTime() + SESSION_LENGTH * 1000);
                await session.save();

                //if password matches wit the one in the database
                //go ahead and generate a cookie for the user
                res.cookie("jwt", token, { maxAge: SESSION_LENGTH * 1000});
                //console.log("user", JSON.stringify(user, null, 2));
                //send user data
                return res.status(200).send(user);
            } else {
                return res.status(401).send({err: "Authentication failed"});
            }
        } else {
            return res.status(401).send({err: "Authentication failed"});
        }
    } catch (error) {
        console.log(error);
    }
};

/**
 * Log a user out
 * @async
 */
const logout = async (req, res) => {
    try {
        //find a session by their token
        const session = await Session.findOne({
            where: {
                token: req.cookies.jwt
            }
        });

        // if we have a session, remove it
        if (session) {
            await session.destroy();
            res.cookie("jwt", "", { maxAge: 0});
            return res.status(200).send("Logged out");
        } else {
            return res.status(401).send({err: "No session"});
        }
    } catch (error) {
        console.log(error);
        return res.status(401).send({err: "Logout failed"});
    }
};

/**
 * Edit a user
 * @param {string} avatar - The avatar of the user (url).
 * @param {string} password - The password of the user (sha-512 hashed).
 * @async
 */
const edit = async (req, res) => {
    try {
        const user = res.locals.user;
        // update user object based on request
        const valid_options = ["avatar", "password", "email"]; // only allow a certain set of fields to be edited
        for (let x=0;x<valid_options.length;x++) {
            const param = valid_options[x];
            if (!req.body[param]) continue; // skip fields that aren't set in the request
            user[param] = req.body[param]; // update value
            if (param == "password")
                user[param] = await bcrypt.hash(req.body[param], 10); // special case for password for hashing it
        }

        await user.save();
        delete user.dataValues.password; // remove password before sending to client

        return res.status(200).send(user);
    } catch (error) {
        console.log(error);
        return res.status(401).send({err: "Update failed"});
    }
};

/**
 * Gets the logged in user
 * @async
 */
const me = async (req, res) => {
    try {
        const user = res.locals.user;
        delete user.dataValues.password; // remove password before sending to client
        return res.status(200).send(user);
    } catch (error) {
        //console.log(error);
        return res.status(401).send({err: "Get me failed"});
    }
}

module.exports = {
    signup,
    login,
    logout,
    edit,
    me
};