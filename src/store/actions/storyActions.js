export const FETCHING_STORIES = 'app/story/FETCHING_STORIES';
export const LOAD_STORIES = 'app/story/LOAD_STORIES';
export const CHANGE_PAGE = 'app/story/CHANGE_PAGE';

export function fetchingStories() {
  return {
    type: FETCHING_STORIES
  };
}

export function loadStories(stories) {
  return {
    type: LOAD_STORIES,
    stories
  };
}

export function changePage(page) {
  return {
    type: CHANGE_PAGE,
    page
  };
}