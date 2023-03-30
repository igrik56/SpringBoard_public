const fs = require('fs');
const process = require('process')
const axios = require('axios')


process.on('exit', function (code){
    console.log(`exiting code: ${code}`)
})

function cat(path, out){
    fs.readFile(path, 'utf-8', function(err, data){
        if (err){
            console.error(`error with ${path}: ${err}`)
            process.exit(1)
        }
        else createOutput(data, out)
    })
}


async function webCat(url, out){
    try{
        let res = await axios.get(url)
        createOutput(res.data, out)
    }
    catch (err){
        console.error(`error with ${url}: ${err}`)
        process.exit(1)
    }
}

function createOutput(data, out){
    if (out){
        fs.writeFile(out, data, 'utf-8', function(err){
            if(err){
                console.log(`Can't write ${out}: ${err}`)
                process.exit(1)
            }
        })
    }
    else console.log(data)
}


let path = process.argv[2]

if(path === '--out'){
    output = process.argv[3]
    path = process.argv[4]
}
if (path.slice(0, 4) === 'http'){
    webCat(path, output)
}
else cat(path, output)
