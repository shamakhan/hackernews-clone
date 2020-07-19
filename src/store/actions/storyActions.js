import { getUrlParams } from '../../utils';

export const API_ROOT = 'https://hn.algolia.com/api/v1';
export const STORY_API = `${API_ROOT}/search?tags=story`;

export const FETCHING_STORIES = 'app/story/FETCHING_STORIES';
export const LOAD_STORIES = 'app/story/LOAD_STORIES';
export const CHANGE_PAGE = 'app/story/CHANGE_PAGE';

export const UPVOTE_STORY = 'app/story/UPVOTE_STORY';
export const HIDE_STORY = 'app/story/HIDE_STORY';

export function fetchStories() {
  return async (dispatch, getState) => {
    dispatch(fetchingStories());
    const pagination = getState().stories.get('pagination');
    try {
      let url = STORY_API;
      const params = getUrlParams();
      if (params.author) {
        url += `,author_${params.author}`;
      }
      // Add pagination data
      url += `&page=${pagination.get('page')}&hitsPerPage=${pagination.get('rows')}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.hits[0]);
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

export function upvoteStory(storyId) {
  return {
    type: UPVOTE_STORY,
    storyId,
  };
}

export function hideStory(storyId) {
  return {
    type: HIDE_STORY,
    storyId,
  };
}
