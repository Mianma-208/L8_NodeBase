const path = require('path');
require('dotenv').config();

function loadEnv(mode) {
    const envFile = `.env.${mode}`;
    const envPath = path.join(__dirname, envFile);

    require('dotenv').config({ path: envPath });
}

function test() {
    const mode = process.argv[2] || 'development';
    loadEnv(mode);
    console.log(`MODE: ${process.env.MODE}`);
}

module.exports = {loadEnv};
