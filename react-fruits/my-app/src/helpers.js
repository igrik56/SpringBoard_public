const rand = (items) => {
    let idx = Math.floor(Math.random() * items.length)
    return items[idx]
}

const remover = (items, item) => {
    for (let i = 0; i < items.length; i++){
        if (items[i] === item){
            return[...items.slice(0, i), ...items.slice(i+1)]
        }
    }
}

export {rand, remover}