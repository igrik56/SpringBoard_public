import React from "react";
import {NavLink} from 'react-router-dom'

function Navbar(d){
    const dogs = d.dogs
    
    const links = dogs.map(dog => (
            <NavLink key={dog.name} to={`/dogs/${dog.name.toLowerCase()}`} style={{margin: "10px"}}>
                {dog.name}
            </NavLink>
    ))

    return(
        <nav>
            <NavLink to="/dogs">Home</NavLink>
            {links}
        </nav>
    )
}

export default Navbar