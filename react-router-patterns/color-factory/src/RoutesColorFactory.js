import React, {useState} from 'react'
import {Route, Routes, Navigate, BrowserRouter,} from 'react-router-dom'

import ColorList from './ColorList'
import NewColorForm from './NewColorForm'
import Color from './Color'

function RoutesColorFactory(){

    const initialColors = {
        black: '#000000',
        green: '#00FF00',
        red: "#FF0000",
        purple: '#A020F0'
    }

    const [colors, setColors] = useState(initialColors)

    function handleAdd(newColorObj){
        setColors( colorsOnBoard => ({...colorsOnBoard, newColorObj}))
    }

    function renderCurrentColor(props){
        const { color } = props.match.params
        console.log(color)
        const hex = colors[color]
        return < Color {...props} hex={hex} color= {color} />
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/colors" element={ <ColorList colors={colors} /> }/>
                <Route exact path='/colors/new' element={ <NewColorForm addColor={handleAdd} />} />
                <Route exact path='/colors/:color' render = {renderCurrentColor} />
                <Route path='*' element={ < Navigate to='/colors' />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesColorFactory