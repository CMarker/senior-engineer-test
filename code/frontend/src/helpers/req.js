/**
 * make a get request
 * @param {string} id - The id of the task.
 * @returns {Promise<Response>}
 */
async function get(url) {
    try {
        return await fetch(url, {
            method: 'GET',
            credentials: 'include'
        });
    }
    catch (e) {

    }
}

/**
 * make a post request
 * @param url
 * @param data
 * @returns {Promise<Response>}
 */
async function post(url, data) {
    try {
        return await fetch(url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    }
    catch (e) {

    }
}

/**
 * make a delete request
 * @param url
 * @param data
 * @returns {Promise<Response>}
 */
async function remove(url, data) {
    try {
        return await fetch(url, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    }
    catch (e) {

    }
}

// export functions
export default {
    get,
    post,
    delete: remove
}