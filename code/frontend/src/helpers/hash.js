import jsSHA from "jssha";
const crypto = window.crypto;

/**
 * helper function to convert from ArrayBuffer to Base64 encoded string
 * @param buffer
 * @returns {string}
 * @private
 */
function _arrayBufferToBase64(buffer) {
    let binary = '';
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
    let hash;
    if (crypto && crypto.subtle)
        hash = await crypto.subtle.digest("SHA-512", new ArrayBuffer(password)); // built in crypto is only available in 'secure' contexts (IE https)
    else
        hash = new jsSHA("SHA-512", "ARRAYBUFFER", { encoding: "UTF8" }).update(new ArrayBuffer(password)).getHash('ARRAYBUFFER'); // fallback to library to hash
    return _arrayBufferToBase64(hash);
}

export default hashPassword;