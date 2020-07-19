import React, { useEffect } from 'react';
// import logo from './logo.svg';
import StoryList from './components/StoryList';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changePage, fetchStories, toggleStory } from './store/actions/storyActions';
import StoryDescription from './components/StoryDescription';
import { ToastContainer } from 'react-toastify';
import Timeline from './components/Timeline';

function App() {
  const { page, storyId, storiesCount } = useSelector((state) => ({
    page: state.stories.getIn(['pagination', 'page']),
    storyId: state.stories.get('storyId'),
    storiesCount: state.stories.getIn(['stories', 'data']).size
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener('popstate', function(event) {
      if (storyId) {
        dispatch(toggleStory());
      } else {
        if (page !== 1) {
          dispatch(changePage(1));
        } else {
          dispatch(fetchStories());
        }
      }
    });
  }, []);
  return (
    <div className="App">
      <ToastContainer />
      {storyId && <StoryDescription storyId={ storyId } />}
      {!storyId && 
        <React.Fragment>
          <StoryList />
          {storiesCount && <Timeline /> }
        </React.Fragment>
      }
    </div>
  );
}

export default App;
