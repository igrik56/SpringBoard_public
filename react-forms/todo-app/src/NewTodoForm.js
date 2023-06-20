import React, {useState} from 'react'
import {v4 as uuid} from 'uuid'

function NewTodoForm({createTodo}){

    const [task, setTask] = useState('')

    const handleChange = e => {
        setTask( e.target.value)
    }

    const formSubmit = e => {
        e.preventDefault()
        createTodo({ task, id: uuid()})
        setTask('')
    }

    return (
        <div>
            <form onSubmit={formSubmit}>
                <div>
                    <label htmlFor='task'>Task: </label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='task'
                        value={task}
                        id='task'
                    />
                    <button id='addNewTodo'>Add a task to the list</button>
                </div>
            </form>
        </div>
    )
}

export default NewTodoForm