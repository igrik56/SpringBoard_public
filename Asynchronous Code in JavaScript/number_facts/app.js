let BASE_URL = "http://numbersapi.com"

let num = 7

function get(url){
    const request = new XMLHttpRequest();
    return new Promise((resolve, reject) =>{
        request.onload = function(){
            if (request.readyState !== 4) return;

            if (request.status >= 200 && request.status < 300){
                resolve (request.response)
            }
            else reject(request.status)
        }

        request.onerror = function handleError(){
            request = null
            reject('ERROR')
        }

        request.open ('GET', url)
        request.send()
    })
}

get(`${BASE_URL}/${num}?json`)
    .then(res => console.log(res))
    .catch(err => console.log(err))


let nums = [1,2,3,4,5]

get(`${BASE_URL}/${nums}?json`)
    .then(res => console.log(res))
    .catch(err => console.log(err))

num += 2

Promise.all(
    Array.from({length : 4}, () => {
        return get(`${BASE_URL}/${num}?json`)
                })
            ).then(res => res.forEach(line => $("body").append(`<p>${line.slice(12, line.indexOf(`",`))}</p>`)))
            .catch(err => console.log(err))