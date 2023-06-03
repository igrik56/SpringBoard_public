const App = () => {
    return(
        <div>
            <Person name="mikeWazowski" age="28" />
            <Person name="Sully" age={29} hobbies={["bowling", "watching tv", "drinking beer"]} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))