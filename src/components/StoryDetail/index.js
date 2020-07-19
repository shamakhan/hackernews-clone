import React from 'react';
import extractDomain from 'extract-domain';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { hideStory, fetchStories, changePage } from '../../store/actions/storyActions';
import { getUrlParams } from '../../utils';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-IN');

const StoryDetail = ({ story }) => {
  const page = useSelector((state) => state.stories.getIn(['pagination', 'page']));
  const dispatch = useDispatch();
  
  const url = story.get('url');
  const domain = url && extractDomain(url);

  const onAuthorClick = (e) => {
    e.preventDefault();
    const urlParams = getUrlParams();
    if (urlParams.author && urlParams.author === story.get('author')) {
      if (page !== 1) {
        dispatch(changePage(1));
      }
      return;
    }
    if (history.pushState) {
        const newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?author=${story.get('author')}`;
        window.history.pushState({ path: newurl }, '', newurl);
    }
    if (page !== 1) {
      dispatch(changePage(1));
    } else {
      dispatch(fetchStories(true));
    }
  }

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
            <a href="" onClick={ onAuthorClick }>
              {story.get('author')}
            </a>
            &nbsp;
          </span>
        }
        <span className="story-time">
          {timeAgo.format(new Date(story.get('created_at')))}
        </span>
        <span className="story-hide-action">
          &nbsp;
          <span className="light-helper-text">[</span>
          <button onClick={ () => dispatch(hideStory(story.get('objectID'))) }>
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