import dotenv from 'dotenv';
dotenv.config();

import app from './app';
require('./database/connection');


function main() {
    app.listen(app.get("port"))
    console.log(`Server is running on port: ${app.get("port")}`)
}

main();