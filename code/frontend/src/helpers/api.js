import req from "./req";
import hashPassword from "./hash";

/**
 * Gets the user object
 * @returns {Promise<any>}
 * @async
 */
async function me() {
    try {
        const response = await req.post(`/api/users/me`, {});
        const ret = await response.json();
        if (ret.err) return;
        return ret;
    }
    catch (e) {

    }
}

/**
 * Login and get user object
 * @param {string} email
 * @param {string} password
 * @returns {Promise<any>}
 * @async
 */
async function login(email, password) {
    try {
        const response = await req.post(`/api/users/login`, {
            email,
            password: await hashPassword(password)
        });
        const ret = await response.json();
        if (ret.err) return;
        return ret;
    }
    catch (e) {

    }
}

/**
 * Register a user
 * @param email
 * @param password
 * @param username
 * @returns {Promise<any>}
 * @async
 */
async function register(email, password, username) {
    try {
        const response = await req.post(`/api/users/signup`, {
            email,
            password: await hashPassword(password),
            username
        });
        const ret = await response.json();
        if (ret.err) return;
        return ret;
    }
    catch (e) {

    }
}

/**
 * Log a user out
 * @returns {Promise<string>}
 * @async
 */
async function logout() {
    try {
        const response = await req.post(`/api/users/logout`, {});
        const ret = await response.json();
        if (ret.err) return;
        return ret;
    }
    catch (e) {

    }
}

/**
 * Update a user
 * @returns {Promise<string>}
 * @async
 */
async function updateUser(user) {
    try {
        const response = await req.post(`/api/users/edit`, user);
        const ret = await response.json();
        if (ret.err) return;
        return ret;
    }
    catch (e) {

    }
}

/**
 * Get a users tasks
 * @returns {Promise<any>}
 * @async
 */
async function getTasks() {
    try {
        const response = await req.get(`/api/tasks/get`);
        const ret = await response.json();
        if (ret.err) return;
        return ret;
    }
    catch (e) {

    }
}

/**
 * Create a task
 * @param task
 * @returns {Promise<any>}
 */
async function addTask(task) {
    try {
        const response = await req.post(`/api/tasks/create`, task);
        const ret = await response.json();
        if (ret.err) return;
        return ret;
    }
    catch (e) {

    }
}

/**
 * Delete a task
 * @param id
 * @returns {Promise<any>}
 */
async function deleteTask(id) {
    try {
        const response = await req.delete(`/api/tasks/delete`, {id});
        const ret = await response.json();
        if (ret.err) return;
        return ret;
    }
    catch (e) {

    }
}

/**
 * Update a task
 * @param task
 * @returns {Promise<any>}
 */
async function updateTask(task) {
    try {
        const response = await req.post(`/api/tasks/update`, task);
        const ret = await response.json();
        if (ret.err) return;
        return ret;
    }
    catch (e) {

    }
}

// export the functions
export default {
    me,
    register,
    login,
    logout,
    updateUser,

    getTasks,
    addTask,
    deleteTask,
    updateTask
};