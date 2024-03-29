import React from "react"
import Pokecard from "./Pokecard"
import './Pokedex.css'


function Pokedex(defaultProps) {

    return (
        <div className="Pokedex">
            <h2>Pokedex</h2>
            <div className="PokedexCards">
                {defaultProps.pokemon.map(e => (
                    <Pokecard 
                        key={e.id}
                        id={e.id}
                        name={e.name}
                        type={e.type}
                        exp={e.baseExperience}
                    />
                ))}
            </div>
        </div>
    )
}

Pokedex.defaultProps = {
    pokemon:
        [
        {id: 4, name: 'Charmander', type: 'fire', baseExperience: 62},
        {id: 7, name: 'Squirtle', type: 'water', baseExperience: 63},
        {id: 11, name: 'Metapod', type: 'bug', baseExperience: 72},
        {id: 12, name: 'Butterfree', type: 'flying', baseExperience: 178},
        {id: 25, name: 'Pikachu', type: 'electric', baseExperience: 112},
        {id: 39, name: 'Jigglypuff', type: 'normal', baseExperience: 95},
        {id: 94, name: 'Gengar', type: 'poison', baseExperience: 225},
        {id: 133, name: 'Eevee', type: 'normal', baseExperience: 65}
    ]
}

export default Pokedex