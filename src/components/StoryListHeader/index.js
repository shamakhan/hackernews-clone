import React from 'react';
import './style.scss';

const StoryListHeader = () => {
  return (
    <thead>
      <tr>
        <th>Comments</th>
        <th>Vote Count</th>
        <th>UpVote</th>
        <th>News Details</th>
      </tr>
    </thead>
  );
}

export default StoryListHeader;