import React from "react";
import { Route, Routes, redirect} from 'react-router-dom'

import DogList from './DogList'
import FilterDogDetails from './FilterDogDetails'

function RoutesDogs({dogs}) {
    if(!dogs) return redirect('/dogs')
    return (
        <Routes>
            <Route exact path='/dogs' element = {<DogList dogs={dogs} />} />
            <Route path="/dogs/:name" element = {<FilterDogDetails dogs={dogs} /> } />
        </Routes>
    )
}

export default RoutesDogs