import React from 'react';
import StoryListItem from '../StoryListItem';
import StoryListHeader from '../StoryListHeader';
import './style.scss';
import StoryListFooter from '../StoryListFooter';

const StoryList = () => {

  return (
    <table>
      <StoryListHeader />
      <tbody>
        <tr>
          <StoryListItem />
        </tr>
      </tbody>
      <StoryListFooter />
    </table>
  )
}

export default StoryList;