const express = require('express');

function createServer () {
    const app = express();

    app.use(express.json());

    // set the view engine to ejs
    app.set('view engine', 'ejs');

    // routes
    app.use('/', require('../routes/profile')());
    app.use('/comments', require('../routes/comment')());

    return app
}

module.exports = {createServer}