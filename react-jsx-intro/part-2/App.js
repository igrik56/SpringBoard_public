const Tweet = (props) => {
    return (
        <div>
            <h3>{props.name}</h3>
            <h4>@{props.username}</h4>
            <span>{props.date}</span>
            <p>{props.message}</p>
        </div>
    )
}

const App = () => {
    return(
        <div>
            <Tweet name="Mike" username="mikeWazowski" date="01/01/2023" message="Happy New Year!"/>
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById("root"))