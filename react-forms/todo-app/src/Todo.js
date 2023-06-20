import React, {useState} from 'react'

function Todo({ task, id, remove, update }) {
    const [editTask, setEditTask] = useState(task);
    const [isEditing, setIsEditing] = useState(false);
  
    const toggleEdit = () => {
      setIsEditing(edit => !edit);
    };
  
    const handleChange = e => {
      setEditTask(e.target.value);
    };
  
    const handleDelete = () => remove(id);
  
    const handleUpdate = e => {
      e.preventDefault();
      update(id, editTask);
      setIsEditing(false);
    };
  
    let defaultTask = (
      <div>
        <li>{task}</li>
        <button onClick={toggleEdit}>Edit</button>
        <button onClick={handleDelete}>X</button>
      </div>
    );
  
    if (isEditing) {
      defaultTask = (
        <div>
          <form onSubmit={handleUpdate}>
            <input type="text" value={editTask} onChange={handleChange} />
            <button>Update!</button>
          </form>
        </div>
      );
    }
  
    return defaultTask;
  }
  
  export default Todo;