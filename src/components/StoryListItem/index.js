import React from 'react';
import StoryDetail from '../StoryDetail';
import './style.scss';

const StoryListItem = ({ story }) => {
  return (
    <tr className="story-row" key={ `story-${story.get('objectID')}` }>
      <td>{story.get('num_comments')}</td>
      <td>{story.get('points')}</td>
      <td></td>
      <td width="100%"><StoryDetail story={ story } /></td>
    </tr>
  );
}

export default StoryListItem;