import React, {useState} from "react";
import { useNavigate } from 'react-router-dom'

function NewColorForm({addColor}) {
    
    const [form, setForm] = useState({name: '', hex: '#000000'})
    const navigate = useNavigate()

    function handleChange(e) {
        e.persist()
        setForm(f => ({...f, [e.target.name]: e.target.value}))
    }

    function handleSubmit(e){
        e.preventDefault()
        addColor({ [form.name]: [form.hex]})
        navigate('/colors')
    }
    
    const {hex, name} = form

    return (
        <div className="NewColor">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Color name</label>
              <input
                name="name"
                id="name"
                placeholder="Enter color name"
                onChange={handleChange}
                value={name}
              />
            </div>
            <div>
              <label htmlFor="hex">Color value</label>
              <input
                type="color"
                name="hex"
                id="hex"
                onChange={handleChange}
                value={hex}
              />
            </div>
            <input type="submit" value="Add this color" readOnly />
          </form>
        </div>
      ); 
}

export default NewColorForm