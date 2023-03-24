const fs = require('fs');
const process = require('process')
const axios = require('axios')


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

async function webCat(url){
    try{
        let res = await axios.get(url)
        console.log(res.data)
    }
    catch (err){
        console.error(`error with ${utl}: ${err}`)
        process.exit(1)
    }
}

let path = process.argv[2]

if (path.slice(0,4) === 'http'){
    webCat(path)
}
else cat(path)