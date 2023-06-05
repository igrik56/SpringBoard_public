import React from "react";
import './Pokecard.css'

function Pokecard(props) {
    let image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`
    return (
            <div className="Pokecard">
                <h3 className="PokecardName">{props.name}</h3>
                <img src={image} alt=""></img>
                <p>Type: {props.type}</p>
                <p>EXP: {props.exp}</p>
            </div>
        )
}

export default Pokecard;