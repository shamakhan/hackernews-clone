import React from 'react';
import extractDomain from 'extract-domain';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { hideStory, fetchStories, changePage } from '../../store/actions/storyActions';
import { getUrlParams, toQueryString } from '../../utils';

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-IN');

const StoryDetail = ({ story }) => {
  const page = useSelector((state) => state.stories.getIn(['pagination', 'page']));
  const dispatch = useDispatch();
  
  const url = story.get('url');
  const domain = url && extractDomain(url);

  const onUrlClick = (e) => {
    e.preventDefault();
    updateUrlQuery('site', domain);
  }

  const onAuthorClick = (e) => {
    e.preventDefault();
    updateUrlQuery('author', story.get('author'));
  }

  const updateUrlQuery = (key, value) => {
    const urlParams = getUrlParams();
    if (urlParams[key] && urlParams[key] === value) {
      if (page !== 1) {
        dispatch(changePage(1));
      }
      return;
    }
    urlParams[key] = value;
    const queryString = toQueryString(urlParams);
    const newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}${queryString}`;
    window.history.pushState({ path: newurl }, '', newurl);
    if (page !== 1) {
      dispatch(changePage(1));
    } else {
      dispatch(fetchStories(true));
    }
  }

  const showStory = (e) => {
    e.preventDefault();
    const newurl = `${window.location.protocol}//${window.location.host}/item?id=${story.get('objectID')}`;
    window.history.pushState({ path: newurl }, '', newurl);
  }

  return (
    <div className="story-details">
      <span className="story-title">
        <span className="sr-only">Story title: </span>
        {
          (url && <a href={ url } target="_blank" >{story.get('title')}</a>) ||
          (<a href="" onClick={ showStory } >{story.get('title')}</a>)
        }
        &nbsp;
        {domain &&
          <span className="story-origin">
            <span className="sr-only">Posted on: </span>
            <span className="light-helper-text">(</span>
            <a href="" onClick={ onUrlClick }>{domain}</a>
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