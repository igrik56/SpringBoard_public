import React from "react";
import {Link, redirect} from 'react-router-dom'

function DogDetails({dog}){
    if (!dog) return redirect('/dogs')

    return(
        <div>
            <img src={dog.src} alt={dog.name} />
            <h1>{dog.name}</h1>
            <h3>{dog.age} years old</h3>
            <ul>
                {dog.facts.map((fact, i) => (
                    <li key={i}>{fact}</li>
                ))}
            </ul>
            <Link to="/dogs">Go Back</Link>
        </div>
    )
}

export default DogDetails