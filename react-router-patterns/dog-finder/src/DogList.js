import React from "react";
import {Link} from 'react-router-dom'

function DogList({dogs}){
    return(
        <div>
            <div className="DogList">
                <h1>Dogs:</h1>
            </div>
            <div>
                {dogs.map(d => (
                    <div key={d.name}>
                        <img src={d.src} alt={d.name} />
                        <Link to={`/dogs/${d.name.toLowerCase()}`}>{d.name}</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default DogList