const express = require('express');
const app = express();
const itemRoutes = require('./routes/items');
const HandleError = require('./handleError');

app.use(express.json());
app.use('/items', itemRoutes);

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

module.exports = app;