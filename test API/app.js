async function getJoke(firstName, lastName){
    console.log(firstName + ` `+ lastName)
    let res = await axios.get(`http://api.icndb.com/jokes/random`, { params: {firstName, lastName}});
    console.log(res.data.value.joke);
}
    
    

document.querySelector(`#jokes`).addEventListener(`submit`, function(e){
    e.preventDefault();
    const first = document.querySelector(`#first`);
    const last = document.querySelector(`#last`);
    //console.log(first.value + ` ` + last.value);
    getJoke(`Nikita`, `Bubnov`);
    //first.value = ``;
    //last.value = ``;
});
