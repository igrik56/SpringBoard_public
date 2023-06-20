import React from "react";

function Box ({id, width = 100, height = 100, handleRemove, backgroundColor = 'gray'}){
    const remove = () => handleRemove(id)

    return (
        <div className='box' style = {
            {
                width: `${width}px`,
                height: `${height}px`,
                backgroundColor
            }
        }>
            <div>
                <button onClick={remove}>X</button>
            </div>
        </div>
    )
}

export default Box