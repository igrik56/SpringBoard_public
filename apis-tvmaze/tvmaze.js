"use strict";

const $showsList = $("#shows-list");
//const $episodesArea = $("#episodes-area");
const $searchForm = $("#search-form");


/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(term) {
  // ADD: Remove placeholder & make request to TVMaze search shows API.
  const response = await axios.get(`https://api.tvmaze.com/search/shows`, {
    params:{
      q: term
    }
  });

  const shows = response.data.map(results => {
    const show = results.show;
    return {
      id: show.id,
      name: show.name,
      summary: show.summary,
      image: show.image ? show.image.medium : `No image`
    };
  });
  return shows;
}


/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
  $showsList.empty();
  // console.log(shows)
  
  for (let show of shows) {
    const $show = $(
        `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img 
              src=${show.image} 
              alt="" 
              class="w-25 mr-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-Episodes-${show.id}">
               Episodes
             </button>
           </div>
         </div>
         <section id="episodes-area-${show.id}">
         <h2>Episodes</h2> 
         <ul id="episodes-list-${show.id}">
         </ul>
       </section>   
       </div>
      `);
      $showsList.append($show);  
      $(`#episodes-area-${show.id}`).hide();
  }
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $("#search-query").val();
  $("#search-query").val(``);
  const shows = await getShowsByTerm(term);


 // $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id) {
  const response = await axios.get(`https://api.tvmaze.com/shows/${id}/episodes`);
  let episodes = response.data.map(episode => ({
    showId: id,
    id: episode.id,
    name: episode.name,
    season: episode.season,
    number: episode.number
  }));
  
  return episodes;
}


function populateEpisodes(episodes) {
  const $episodesList = $(`#episodes-list-${episodes[0].showId}`);
  // console.log($episodesList);
  // console.log(episodes[0].showId);
  $episodesList.empty();

  for (let episode of episodes){
    const $item = $(`<li> ${episode.name}
                          (season ${episode.season}, episode ${episode.number})
                    </li>`);
    
    $episodesList.append($item);
  }
  // $episodesArea.show();
}



$(`#shows-list`).on(`click`, `button`, async function (evt){            //since there is only one button, selector is button
  //console.log(`clicked on episode btn`);
  const showId = $(evt.target).closest(`.Show`).data(`show-id`);

  if($(evt.target)[0].parentNode.parentNode.nextSibling.nextSibling.childNodes[3].firstChild.tagName !== `LI` ){
    const episodes = await getEpisodesOfShow(showId);
    populateEpisodes(episodes);
    $(`#episodes-area-${showId}`).show();
  }
  else{
    console.log(`list exist`);
    $(`#episodes-area-${showId}`).toggle();
  }
});

// $(`#show-list`).on(`click`, `.Show-hideEpisodes`, function (evt){
//   console.log(`click to remove episodes`);
//   console.log($(evt.target).closest(`.Show`).data(`episodes-area`));
//   $(evt.target.classList.replace(`Show-hideEpisodes`, `Show-getEpisodes`));
// });