
class Cards{

    constructor(){
        this.BASE_URL = "https://deckofcardsapi.com/api/deck"
        this.$btn = $(`button`)
        this.$board = $(`#board`)
        this.newDraw()
        this.drawCouple()
        this.bringMeEveryone_whatDoYouMeanEveryone_EVERYONE()
    }

    async newDraw(){
        let res = await axios.get(`${this.BASE_URL}/new/draw/`)
        let {suit, value} = res.data.cards[0]
        console.log(`${value} - ${suit}`)
    }

    async drawCouple(){
        let res = await axios.get(`${this.BASE_URL}/new/draw/`)
        const deckID = res.data.deck_id
        let firstCard = res.data.cards[0]
        console.log(`${firstCard.suit} - ${firstCard.value}`)
        res = await axios.get(`${this.BASE_URL}/${deckID}/draw/`)
        let secondCard = res.data.cards[0]
        console.log(`${secondCard.suit} - ${secondCard.value}`)
    }

    async bringMeEveryone_whatDoYouMeanEveryone_EVERYONE (){
        let res = await axios.get(`${this.BASE_URL}/new/shuffle`)
        const deckID = res.data.deck_id
        
        this.$btn.on('click', async function() {                                    // "this" changes to html element of a button
            let card = await axios.get(`${this.BASE_URL}/${deckID}/draw/`)          // need to use .bind
            let cardShow = card.data.cards[0].image
            
            if ( this.$board[0].children[0]){
                this.$board[0].children[0].remove()
            }
            
            this.$board.append($(`<img src='${cardShow}'>`))
            if (card.data.remaining === 0){
                this.$btn.hide()
                this.$board[0].children[0].remove()
                this.$board.append($(`<h1>Out of Cards!</h1>`))
            }
            
        })
    }
}

let start = new Cards()

