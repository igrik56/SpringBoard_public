console.log("Let's get this party started!");
const $gifs_results = $(`#results`);
const $search_input = $(`#input`);

function addGif(result){
    if(result){
        let random = Math.floor(Math.random()* result.data.length);

        //console.log(result.data);

        let $newGif = $(`<img>`,{
            src:result.data[random].images.original.url
        });
        $gifs_results.append($newGif);
    }
    else {
        throw console.error("Failed to receive response from API");
    }
}

$(`#search_giphy`).on(`click`, async function(e){
    e.preventDefault();
    let term = $search_input.val();
    $search_input.val('');

    const result = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
        params:{
            q: term,
            api_key: `ZWLhGBnD7WPhBQzBJynPAZv6KvB6LyL5`
        }
    });
    addGif(result.data);
});

$(`#clear`).on(`click`, function(){
    $gifs_results.empty();
});