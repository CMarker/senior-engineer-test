const bcrypt = require("bcrypt");
const cookie = require("cookie");
const axios = require("axios");
axios.defaults.validateStatus = function () { return true; };
//axios.defaults.withCredentials = true;

const hash = require("../helpers/hash");
const env = require("../env");
const PORT = process.env.PORT || env.port || 8080;

// curl -d '{"key1":"value1", "key2":"value2"}' -H "Content-Type: application/json" -X POST http://localhost:8080/api/users/signup

let token;

/**
 * test the yser API calls
 * @returns {Promise<void>}
 */
async function test_user() {
    // fail cases
    //const signupResponse = await axios.post(`http://localhost:${PORT}/api/users/signup`, {});
    //const signupResponse = await axios.post(`http://localhost:${PORT}/api/users/signup`, {username: "test_user"});
    //const signupResponse = await axios.post(`http://localhost:${PORT}/api/users/signup`, {email: "test_email"});

    const password = await hash.hashPassword("test_password");
    const signupResponse = (await axios.post(`http://localhost:${PORT}/api/users/signup`, {
        username: "test_user",
        email: "test_email@email.com",
        password
    }));
    console.log(signupResponse.data);

    const loginResponse = (await axios.post(`http://localhost:${PORT}/api/users/login`, {
        email: "test_email@email.com",
        password
    }));
    console.log(loginResponse.data);

    const cookies = cookie.parse(loginResponse.headers["set-cookie"][0]);
    token = cookies.jwt;

    const editResponse = (await axios.post(`http://localhost:${PORT}/api/users/edit`, {avatar: "url"}, {
        headers: {
            Cookie: cookie.serialize("jwt", token)
        }
    }));

    console.log(editResponse.data);

    // generally skip this test so the test user exists to run the task tests
    /*const logoutResponse = (await axios.post(`http://localhost:${PORT}/api/users/logout`, {}, {
        headers: {
            Cookie: cookie.serialize("jwt", token)
        }
    }));

    console.log(logoutResponse.data);*/
}

/**
 * Test the Task API calls
 * @returns {Promise<void>}
 */
async function test_task() {
    const createTaskResponse = await axios.post(`http://localhost:${PORT}/api/tasks/create`, {
            title: "test task",
            description: "this is a test task",
            //due_date, status, priority
        }, { headers: { Cookie: cookie.serialize("jwt", token) }});

    console.log(createTaskResponse.data);

    const getTasksResponse = await axios.get(`http://localhost:${PORT}/api/tasks/get`, {
        headers: { Cookie: cookie.serialize("jwt", token) }
    });

    console.log(getTasksResponse.data);

    const updateTaskResponse = await axios.post(`http://localhost:${PORT}/api/tasks/update`, {
        id: getTasksResponse.data[0].id,
        title: "new title",
        description: "changed the description"
    }, {headers: { Cookie: cookie.serialize("jwt", token) }});

    console.log(updateTaskResponse.data);
}

async function test() {
    await test_user();
    await test_task();

    console.log("done testing api");
}

test();