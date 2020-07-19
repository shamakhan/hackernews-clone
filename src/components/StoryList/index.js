import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StoryListItem from '../StoryListItem';
import StoryListHeader from '../StoryListHeader';
import StoryListFooter from '../StoryListFooter';
import Loader from '../Loader';
import { fetchStories } from '../../store/actions/storyActions';
import './style.scss';



const StoryList = () => {
  const { stories, loading, page } = useSelector((state) => ({
    stories: state.stories.getIn(['stories', 'data']).toList(),
    loading: state.stories.getIn(['stories', 'loading']),
    page: state.stories.getIn(['pagination', 'page'])
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStories());
  }, [page]);

  return (
    <div className="story-wrapper">
      {loading && (<Loader />)}
      <table>
        <StoryListHeader />
        <tbody>
          {stories.size === 0 && (
          <React.Fragment>
            <tr>
              <td colSpan="4" className="table-placeholder">
                {!loading && 'No stories found.'}
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td width="100%"></td>
            </tr>
          </React.Fragment>
              ) || (
                stories.map((story) => (
                  <tr className="story-row" key={ `story-${story.get('objectID')}` }>
                    <StoryListItem story={ story } />
                  </tr>)
                )
              )}
        </tbody>
        <StoryListFooter />
      </table>
    </div>
  )
}

export default StoryList;