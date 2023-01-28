"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

// Show add story form.

function navPostStories(evt) {
  console.debug("navPostStoryClick", evt);
  hidePageComponents();
  $addStoryForm.show();
}

$navPost.on(`click`, navPostStories);

//Show Favorite Stories form

function navFavStories(evt) {
  console.debug("navFavStoriesClick", evt);
  hidePageComponents();
  $favStoryForm.show();
  favStoryAddToForm();
}

$navFavStories.on(`click`, navFavStories);

//Show User's posts.

function navOwnStories(evt) {
  console.debug("navOwnStoriesClick", evt);
  hidePageComponents();
  $ownStoryForm.show();
  ownStoryAddToForm();
}

$navOwnStory.on(`click`, navOwnStories);
/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $loginForm.hide();
  $signupForm.hide();
  $navLogOut.show();
  $navFavStories.show();
  $navPost.show();
  $navOwnStory.show();
  $addStoryForm.hide();
  $navUserProfile.text(`${currentUser.username}`).show();
}
