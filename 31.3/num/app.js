let BASE_URL = "http://numbersapi.com"

let num = 37
let nums = [1,2,3,4,5]

async function funFact(){
    const res = await axios.get(`${BASE_URL}/${num}`)
    return console.log(res.data)
}

async function moreFacts(){
    const res = await axios.get(`${BASE_URL}/${nums}`)
    for ( i in res.data){
        console.log(res.data[i])
    }
}

async function numFacts(){
    for ( let i = 0; i < 4; i++){
        const res = await axios.get(`${BASE_URL}/${num}`)
        $(`body`).append(`<p>${res.data}</p>`)
    }
}



funFact()
moreFacts()
numFacts()