import React from 'react';
import StoryDetail from '../StoryDetail';
import './style.scss';

const StoryListItem = ({ story }) => {
  return (
    <React.Fragment>
      <td>
        <span className="sr-only">New Story. </span>
        <span className="sr-only">Number of comments</span>
        {story.get('num_comments')}
      </td>
      <td>
        <span className="sr-only">. Number of upvotes </span>
        {story.get('points')}
      </td>
      <td>
        <button className="upvote-button" aria-labelledby="button">
          <div className="upvote-arrow" ></div>
          <span className="sr-only">Up vote button for this story</span>
        </button>
      </td>
      <td width="100%"><StoryDetail story={ story } /></td>
    </React.Fragment>
  );
}

export default StoryListItem;