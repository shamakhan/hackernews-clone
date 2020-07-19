import { fromJS } from 'immutable';
import { getDataFromStorage, saveDataToStorage } from '../../utils';

import {
  FETCHING_STORIES,
  LOAD_STORIES,
  CHANGE_PAGE,
  UPVOTE_STORY,
  HIDE_STORY,
} from '../actions/storyActions';

const initialState = fromJS({
  stories: {
    loading: false,
    data: [],
  },
  pagination: {
    totalPages: 1,
    rows: 30,
    page: 1,
  }
});

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCHING_STORIES:
      return state.setIn(['stories', 'loading'], true);
    case LOAD_STORIES: {
      const savedData = getDataFromStorage();
      return state.setIn(['stories', 'loading'], false)
        .setIn(['stories', 'data'], fromJS(
          action.data.hits.reduce((acc, story) => {
            const storyId = story.objectID;
            const storySavedData = savedData[storyId] || {};
            if (storySavedData.hidden) {
              return acc;
            }
            acc[storyId] = story;
            acc[storyId].points = acc[storyId].points + (storySavedData.votes || 0);
            return acc;
          }, {})
        ))
        .setIn(['pagination', 'totalPages'], action.data.nbPages);
    }
    case CHANGE_PAGE:
      return state.setIn(['pagination', 'page'], action.page);
    case UPVOTE_STORY:
      saveUpvote(action.storyId);
      return state.updateIn(['stories', 'data', action.storyId], (story) => story.update('points', (points) => points+1));
    case HIDE_STORY:
      saveStoryHidden(action.storyId);
      return state.updateIn(['stories', 'data'], (stories) => stories.remove(action.storyId));
    default:
      return state;
  }
};

const saveUpvote = (storyId) => {
  const data = getDataFromStorage();
  const storyData = data[storyId] || {};
  storyData.votes = (storyData.votes || 0) + 1;
  data[storyId] = storyData;
  saveDataToStorage(data);
}

const saveStoryHidden = (storyId) => {
  const data = getDataFromStorage();
  const storyData = data[storyId] || {};
  storyData.hidden = true;
  data[storyId] = storyData;
  saveDataToStorage(data);
}