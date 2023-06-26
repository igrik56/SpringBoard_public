import React from "react";
import {NavLink} from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    return (
        <nav className="Navbar">
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/Cola'>Cola</NavLink>
            <NavLink to='/Chips'>Chips</NavLink>
            <NavLink to='/Pudding'>Pudding</NavLink>
            <NavLink to='/Kolobochek'>Happy</NavLink>
        </nav>
    )
}

export default Navbar