/** Command-line tool to generate Markov text. */

const fs = require('fs')
const axios = require('axios')
const process = require('process')
const markov = require('./markov')


function createText(text){
    let mm = new markov.MarkovMachine(text)
    console.log(mm.makeText())
}

function makeText(path){
    fs.readFile(path, 'utf-8', function res(err, data){
        if(err){
            console.error(`Can't read file: ${path}: ${err}`)
            process.exit(1)
        }
        else createText(data)
    })
}

async function makeUrlText(url){
    let res

    try{
        res = await axios.get(url)
    }
    catch (err){
        console.error(`Can't read url: ${url}: ${err}`)
        process.exit(1)
    }
    createText(res.data)
}

let [method, path] = process.argv.slice(2)

if (method === `file`){
    makeText(path)
}
else if (method === `url`) makeUrlText(path)
else {
    console.error(`Invalid method: ${method}`)
    process.exit(1)
}