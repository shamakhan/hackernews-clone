import React from 'react';
import extractDomain from 'extract-domain';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import './style.scss';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-IN');

const StoryDetail = ({ story }) => {
  const url = story.get('url');
  const domain = url && extractDomain(url);
  return (
    <div className="story-details">
      <span className="story-title">
        <span className="sr-only">Story title: </span>
        {
          (url && <a href={ url } >{story.get('title')}</a>) ||
          (story.get('title'))
        }
        &nbsp;
        {domain &&
          <span className="story-origin">
            <span className="sr-only">Posted on: </span>
            <span className="light-helper-text">(</span>
            <a href={ domain }>{domain}</a>
            <span className="light-helper-text">)</span>
            &nbsp;
          </span>
        }
      </span>
      <span className="story-sub-details">
        {story.get('author') &&
          <span className="story-author">
            <span className="light-helper-text">by</span>&nbsp;
            <span className="sr-only">Author: </span>
            {story.get('author')}
            &nbsp;
          </span>
        }
        <span className="story-time">
          {timeAgo.format(new Date(story.get('created_at')))}
        </span>
        <span className="story-hide-action">
          &nbsp;
          <span className="light-helper-text">[</span>
          <button >
            <span className="sr-only">. Button to </span>
            hide
            <span className="sr-only">this story. </span>
          </button>
          <span className="light-helper-text">]</span>
        </span>
      </span>
    </div>
  );
}

export default StoryDetail;