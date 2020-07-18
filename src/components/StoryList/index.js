import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import StoryListItem from '../StoryListItem';
import StoryListHeader from '../StoryListHeader';
import StoryListFooter from '../StoryListFooter';
import './style.scss';
import Loader from '../Loader';
import { fetchStories } from '../../store/actions/storyActions';

const StoryList = () => {
  const { stories, loading, page } = useSelector((state) => ({
    stories: state.stories.getIn(['stories', 'data']),
    loading: state.stories.getIn(['stories', 'loading']),
    page: state.stories.getIn(['pagination', 'page'])
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStories());
  }, [page])

  return (
    <table>
      <StoryListHeader />
      <tbody>
        {loading && (
          <tr>
            <td colSpan="4">
              <Loader />
            </td>
          </tr>
        )}
        {!loading && (
            (stories.size === 0 && (
              <tr>
                <td colSpan="4">No stories found.</td>
              </tr>
            )) || (
              stories.map((story) => <StoryListItem story={ story } />)
            )
        )}
      </tbody>
      <StoryListFooter />
    </table>
  )
}

export default StoryList;