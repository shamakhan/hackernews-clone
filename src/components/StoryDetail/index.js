import React from 'react';
import './style.scss';

const StoryDetail = ({ story }) => {
  return (
    <span className="story-details">
      {story.get('title')}
    </span>
  );
}

export default StoryDetail;