import axios from "axios";
import {useEffect, useState} from "react";

function useFlip(initialVal = true){
    const [isFacingUp, setIsFacingUp] = useState(initialVal)
    const flipCard = () => {
        setIsFacingUp(isUp => !isUp)
    }
    return [isFacingUp, flipCard]
}

function useAxios(baseUrl, keysInLS){
    const [response, setResponse] = useLocalStorage(keysInLS)

    const addResponseData = async (addData = data => data, urlEnding = '') => {
        const res = await axios.get(`${baseUrl}${urlEnding}`)
        setResponse(data => [...data, addData(res.data)])
    }
    
    const clearResponses = ()=> setResponse([])
    
    return [response, addResponseData, clearResponses]
}

function useLocalStorage(key, initialVal =[]){
    if(localStorage.getItem(key)){
        initialVal = JSON.parse(localStorage.getItem(key))
    }

    const [value, setValue] = useState(initialVal)
    
    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(value))
    },[value, key])

    return[value, setValue]
}


export {useFlip, useAxios, useLocalStorage}