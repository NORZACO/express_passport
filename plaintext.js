const crypto = require('crypto');



const plaintext = 'secret-message';
const cipher = crypto.createCipher('aes192', 'secret-key');
let encrypted = cipher.update(plaintext, 'utf8', 'hex');
encrypted += cipher.final('hex');
console.log(encrypted);



module.exports = {
    'plaintext': plaintext,
    'encrypted': encrypted,
};
