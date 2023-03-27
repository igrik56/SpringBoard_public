const express = require(`express`)
const numsOperations = require('./numsOperations.js')

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/mean', (req, res, next) =>{
    let nums = req.query
    let mean = numsOperations.numsExtract(nums, 'mean')

    if (mean.stack) next(mean)
    return res.json(mean)
})

app.get('/median', (req, res, next) =>{
    let nums = req.query
    let median = numsOperations.numsExtract(nums, 'median')

    if (median.stack) next(median)
    return res.json(median)
})

app.get('/mode', (req, res, next) =>{
    let nums = req.query
    let mode = numsOperations.numsExtract(nums, 'mode')

    if (mode.stack) next(mode)
    return res.json(mode)
})

app.use(function(err, req, res, next) {

    let status = err.status || 400;
    let message = err.message;
  
    return res.status(status).json({
      error: {message, status}
    });
  });

// has to be at the end of a file
app.listen(port, () => {
    console.log(`server is running  at port ${port}`)
})
