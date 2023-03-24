
BASE_URL = "https://deckofcardsapi.com/api/deck"
$btn = $(`button`)
$board = $(`#board`)

async function newDraw(){
    let res = await axios.get(`${BASE_URL}/new/draw/`)
    let {suit, value} = res.data.cards[0]
    console.log(`${value} - ${suit}`)
}

async function drawCouple(){
    let res = await axios.get(`${BASE_URL}/new/draw/`)
    const deckID = res.data.deck_id
    let firstCard = res.data.cards[0]
    console.log(`${firstCard.suit} - ${firstCard.value}`)
    res = await axios.get(`${BASE_URL}/${deckID}/draw/`)
    let secondCard = res.data.cards[0]
    console.log(`${secondCard.suit} - ${secondCard.value}`)
}

async function bringMeEveryone_whatDoYouMeanEveryone_EVERYONE (){
    let res = await axios.get(`${BASE_URL}/new/shuffle`)
    const deckID = res.data.deck_id
    
    $btn.on('click', async function() {
        let card = await axios.get(`${BASE_URL}/${deckID}/draw/`)
        let cardShow = card.data.cards[0].image
        
        if ( $board[0].children[0]){
            $board[0].children[0].remove()
        }
        
        $board.append($(`<img src='${cardShow}'>`))
        if (card.data.remaining === 0){
            $btn.hide()
            $board[0].children[0].remove()
            $board.append($(`<h1>Out of Cards!</h1>`))
        }
        
    })
}
        
newDraw()
drawCouple()
bringMeEveryone_whatDoYouMeanEveryone_EVERYONE()