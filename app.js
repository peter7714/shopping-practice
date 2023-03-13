const express = require('express');
const app = express();
const HandleError = require('./handleError');
const db = require('./fakeDb')

app.use(express.json());









// Error handling //

app.use((req, res, next) =>{
    const err = new HandleError('Not Found', 404);
    return next(err);
});

app.use((err, req, res, next) =>{
    res.status(err.status || 500);
    return res.json({
        error: err,
        message: err.msg
    });
});

module.exports = {app}