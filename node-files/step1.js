const fs = require('fs');
const process = require('process')

process.on('exit', function (code){
    console.log(`exiting code: ${code}`)
})

function cat(path){
    fs.readFile(path, 'utf-8', function(err, data){
        if (err){
            console.error(`error with ${path}: ${err}`)
            process.exit(1)
        }
        else console.log(data)
    })
}

cat (process.argv[2])