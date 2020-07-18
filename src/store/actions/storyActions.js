export const API_ROOT = 'https://hn.algolia.com/api/v1';
export const STORY_API = `${API_ROOT}/search?tags=story`;

export const FETCHING_STORIES = 'app/story/FETCHING_STORIES';
export const LOAD_STORIES = 'app/story/LOAD_STORIES';
export const CHANGE_PAGE = 'app/story/CHANGE_PAGE';

export function fetchStories() {
  return async (dispatch, getState) => {
    dispatch(fetchingStories());
    const pagination = getState().stories.get('pagination');
    try {
      const response = await fetch(`${STORY_API}&page=${pagination.get('page')}&hitsPerPage=${pagination.get('rows')}`);
      const data = await response.json();
      console.log(data);
      dispatch(loadStories(data));
    } catch (e) {}
  } 
}

export function fetchingStories() {
  return {
    type: FETCHING_STORIES
  };
}

export function loadStories(data) {
  return {
    type: LOAD_STORIES,
    data
  };
}

export function changePage(page) {
  return {
    type: CHANGE_PAGE,
    page
  };
}