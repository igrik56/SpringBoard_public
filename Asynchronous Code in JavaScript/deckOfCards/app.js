let BASE_URL = "https://deckofcardsapi.com/api/deck"

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

$.getJSON(`${BASE_URL}/new/draw/`)
    .then(res => {
        let { suit, value } = res.cards[0]
        console.log(`${value} - ${suit}`)
    });



let firstCard = null
let secondCard = null

$.getJSON(`${BASE_URL}/new/draw/`)
    .then(res => {
        firstCard = res.cards[0]
        let id = res.deck_id
        console.log(`${firstCard.suit} - ${firstCard.value}`)
        return $.getJSON(`${BASE_URL}/${id}/draw/`)
    })
    .then(res => {
        let secondCard = res.cards[0]
        console.log(`${secondCard.suit} - ${secondCard.value}`)
    })


let deckID = null
let $btn = $(`button`)
let $board = $(`#board`)

$.getJSON(`${BASE_URL}/new/shuffle/`)
    .then(res => {
        deckID = res.deck_id
    })

$btn.on('click', function () {
    $.getJSON(`${BASE_URL}/${deckID}/draw/`)
    .then(res => {
        let cardShow = res.cards[0].image
        
        if ( $board[0].children[0]) {
            $board[0].children[0].remove()
        }

        $board.append(
            $(`<img src='${cardShow}'>`)
        )
        if (res.remaining === 0){
            $btn.hide()
            $board[0].children[0].remove()
            $board.append($(`<h1>Out of Cards!</h1>`))
        } 
    })
})