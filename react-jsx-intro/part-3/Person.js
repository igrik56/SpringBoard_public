const Person = (props) =>{
    let ageCheck = props.age >= 18 ? "Please go vote!" : "You must be 18"
    let hobbies = props.hobbies ? props.hobbies.map(e => <li>{e}</li>) : "No hobbies"

    return (
        <div>
            <p>Learn some information about this person</p>
            <p>Name: {props.name.length > 8 ? props.name.slice(0,6) : props.name}</p>
            <h3>{ageCheck}</h3>
            <ul>
                Hobbies: {hobbies}
            </ul>
        </div>
    )
}
