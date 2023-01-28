"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */


async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  const addStar = Boolean(currentUser && story.author !== currentUser.username);
  const isOwnStory = Boolean(story.author === currentUser.username);

  return $(`
      <li id="${story.storyId}">
        ${isOwnStory ? removeBtn() : ``}
        ${addStar ? checkStar(story, currentUser) : ""}
        <a href="${story.url}" target="a_blank" class="story-link">
        ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}



/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

async function postStories(evt){
  console.debug("postStory", evt);
  evt.preventDefault();

  const title = $("#title-of-story").val();
  const author = $("#author-of-story").val();
  const url = $("#url-of-story").val();

  const story = await storyList.addStory(currentUser, {title, author, url});

  const $story = generateStoryMarkup(story);
  $allStoriesList.prepend($story);

  $addStoryForm.trigger("reset");
  $addStoryForm.hide();
  putStoriesOnPage();
}

$addStoryForm.on(`submit`, postStories);

//Favorite stories

function checkStar(story, user){
  const isFavStory = user.isFavStory(story);
  const startToggle = isFavStory ? `fas` : `far`;
  return `<span class="star">
          <i class="${startToggle} fa-star"></i>
          </span>`;
}

function removeBtn(){
  return `
      <span class="trash-can">
        <i class="fas fa-trash-alt"></i>
      </span>`;
}
async function favStoriesStarToggle(evt){
  console.debug("favStory", evt);

  const $target = $(evt.target);
  const $closestLi = $target.closest(`li`);
  const storyId = $closestLi.attr(`id`);
  const story = storyList.stories.find(e => e.storyId === storyId);

  if($target.hasClass(`fas`)){
    await currentUser.favStoryRemove(story);
    $target.closest(`i`).toggleClass(`fas far`);
  }
  else{
    await currentUser.favStoryAdd(story);
    $target.closest(`i`).toggleClass(`fas far`);
  }
}

$allStoriesList.on(`click`, `.star`, favStoriesStarToggle);
$favStoryList.on(`click`, `.star`, favStoriesStarToggle);

function favStoryAddToForm(){
  $favStoryList.empty();

  if(currentUser.favorites.length === 0){
    $favStoryList.append(`<h2>You don't have favorite stories</h2>`);
  }
  else{
    for (let story of currentUser.favorites){
      const $story = generateStoryMarkup(story);
      $favStoryList.append($story);
    }
  }
  $favStoryForm.show();
}

function ownStoryAddToForm(){
  
  $ownStoryList.empty();

  if(currentUser.ownStories.length === 0){
    $ownStoryList.append(`<h2>You did not post any stories</h2>`);
    $ownStoryForm.show();
    return
  }
// else{
  for (let story of currentUser.ownStories){
    const $story = generateStoryMarkup(story);
    $ownStoryList.append($story);
    }
  // }
  $ownStoryForm.show();
}

async function ownStoryDelete(e){
  const $target = e.target;
  const $closestLi = $target.closest(`li`);
  const storyId = $closestLi.id;

  await storyList.removeStory(currentUser, storyId);
  await ownStoryAddToForm();
}
$ownStoryForm.on(`click`, `.trash-can`, ownStoryDelete);

async function ownStoryDeleteOnMain(e){
  const $target = e.target;
  const $closestLi = $target.closest(`li`);
  const storyId = $closestLi.id;

  await storyList.removeStory(currentUser, storyId);
  await putStoriesOnPage();
}
$allStoriesList.on(`click`, `.trash-can`, ownStoryDeleteOnMain);