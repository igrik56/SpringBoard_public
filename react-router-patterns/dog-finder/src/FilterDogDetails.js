import React from "react";
import { redirect, useParams } from "react-router-dom";
import DogDetails from "./DogDetails";

function FilterDogDetails({dogs}){
    const {name} = useParams()

    if(name){
        const currentDog = dogs.find(
            d => d.name.toLowerCase() === name.toLocaleLowerCase()
        )
        console.log(currentDog)
        if (currentDog === undefined) return redirect('/dogs')
        return <DogDetails dog={currentDog} />
    }
    return null
}

export default FilterDogDetails