'use strict';

const { connect } = require('./db/conn');
const { createServer } = require("./utils/server")

const port =  process.env.PORT || 3000;

connect().then(() => {
    try {
        // start server
        const server = app.listen(port);
        console.log('Express started. Listening on http://localhost:%s', port);
    } catch (error) {
        console.log("can't connect to database", error)
    }
}).catch((error) => {
    console.log("invalid connection", error)
})

const app = createServer()


module.exports = app;