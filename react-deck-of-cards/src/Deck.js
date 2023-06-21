import React, {useState, useRef, useEffect} from "react";
import axios from "axios";
import Card from "./Card";

const API_BASE_URL = "http://deckofcardsapi.com/api/deck"

function Deck(){
    const [deck, setDeck] = useState(null)
    const [draw, setDrawn] = useState([])
    const [autoDraw, setAutoDraw] = useState(false)
    const timerRef = useRef(null)

    useEffect(() => {
        async function getData() {
            let newDeck = await axios.get(`${API_BASE_URL}/new/shuffle/`)
            setDeck(newDeck.data)
        }
        getData()
    }, [setDeck])

    useEffect(() => {
        async function getCard(){
            let {deck_id} = deck

            try{
                let drawRes = await axios.get(`${API_BASE_URL}/${deck_id}/draw/`)

                if(drawRes.data.remaining === 0){
                    setAutoDraw(false)
                    throw new Error ('no cards remaining!')
                }
                const card = drawRes.data.cards[0]

                setDrawn(d => [...d, {
                                    id: card.code,
                                    name: card.value +' of '+ card.suit,
                                    image: card.image
                                    }
                            ]
                        )

            }catch(e){
                alert(e)
            }
        }

        if(autoDraw && !timerRef.current){
            timerRef.current = setInterval(async () => {
                await getCard()
            }, 1000)
        }

        return () => {
            clearInterval(timerRef.current)
            timerRef.current = null
        }

    }, [autoDraw, setAutoDraw, deck])

    const toggleAutoDraw = () => {
        setAutoDraw(auto => !auto)
    }

    const cards = draw.map(c => (
        <Card 
            key={c.id}
            name={c.name}
            image={c.image}
        />
    ))

    return (
        <div className="Deck">
            {deck ? (
                <button className="getCard" onClick={toggleAutoDraw}>
                    {autoDraw ? "STOP" : "KEEP"} DRAWING 
                </button>
            ) : null}
            <div className="board" style={{
                margin: '200px',
                backgroundColor: 'green'
            }}>{cards}</div>
        </div>
    )
}

export default Deck