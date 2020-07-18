import { fromJS } from 'immutable';

import {
  FETCHING_STORIES,
  LOAD_STORIES,
  CHANGE_PAGE
} from '../actions/storyActions';

const initialState = fromJS({
  stories: {
    loading: false,
    data: [],
  },
  pagination: {
    rows: 30,
    page: 1,
  }
});

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCHING_STORIES:
      return state.setIn(['stories', 'loading'], true);
    case LOAD_STORIES:
      return state.setIn(['stories', 'loading'], false)
        .setIn(['stories', 'data'], fromJS(action.stories));
    case CHANGE_PAGE:
      return state.setIn(['pagination', 'page'], action.page);
    default:
      return state;
  }
};
