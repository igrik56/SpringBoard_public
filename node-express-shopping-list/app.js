const express = require('express')
const listRoutes = require('./itemsRouter')


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/items', listRoutes)

app.use(function(err, req, res, next) {

    let status = err.status || 400;
    let message = err.message;
  
    return res.status(status).json({
      error: {message, status}
    });
  });

  module.exports = app