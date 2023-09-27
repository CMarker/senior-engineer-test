const crypto = globalThis.crypto || require("node:crypto").webcrypto; // in two diff spots depending on version of node

/**
 * helper function to convert from ArrayBuffer to Base64 encoded string
 * @param buffer
 * @returns {string}
 * @private
 */
function _arrayBufferToBase64(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

/**
 * function to hash the password so we aren't sending it plaintext
 * @param password
 * @returns {Promise<string>}
 */
async function hashPassword(password) {
    const hash = await crypto.subtle.digest("SHA-512", new ArrayBuffer(password));
    return _arrayBufferToBase64(hash);
}

module.exports = {
    hashPassword
}