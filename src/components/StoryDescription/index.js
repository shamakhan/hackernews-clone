import React, { useEffect, useState } from 'react';
import './style.scss';
import { STORY_API, upvoteStory } from '../../store/actions/storyActions';
import { timeAgo } from '../../utils';
import { useDispatch } from 'react-redux';

const StoryDescription = ({ storyId }) => {
  const dispatch = useDispatch();
  const [story, setStory] = useState({ loading: true });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(`${STORY_API}_${storyId}`);
        const data = await result.json();
        setStory((prevState) => ({ ...prevState, loading: false, data: data.hits }));
      } catch (e) {
        setStory((prevState) => ({ ...prevState, loading: false, data: [] }));
      }
    };
 
    fetchData();
  }, [])

  function createMarkup(text) {
    return { __html: text };
  }

  const upvote = (storyId) => {
    dispatch(upvoteStory(storyId, false));
  }

  return (
    <div className="story-description-wrapper">
      <div className="story-header">Story in detail</div>
      {story.loading && 
        <div className="loader-parent">
          <div className="loader"></div>
        </div>
      }
      {!story.loading && 
        <div className="story-description" >
          {
              (story.data.length === 0 && <span> No data found. </span>) ||
              <React.Fragment>
                <div className="story-title">
                  <button className="upvote-button" onClick={ () => upvote(story.data[0].objectID) }>
                    <div className="upvote-arrow" ></div>
                  </button>
                  {story.data[0].title}
                </div>
                <div className="story-text" dangerouslySetInnerHTML={ createMarkup(story.data[0].story_text) }></div>
                <hr />
                <b>Comments:</b>
                <br />
                <div className="comments-section">
                  {story.data.slice(1).map((comment) => 
                    (
                      <div className="comment-wrapper">
                        <button className="upvote-button" onClick={ () => upvote(comment.objectID) }>
                          <div className="upvote-arrow" ></div>
                        </button>
                        <div className="comment-meta">
                          <span className="comment-author">{comment.author}</span>&nbsp;
                          <span className="comment-time">
                            {timeAgo.format(new Date(comment.created_at))}
                          </span>
                        </div>
                        <div className="comment-text" dangerouslySetInnerHTML={ createMarkup(comment.comment_text) }></div>
                        {/* <hr/> */}
                      </div>
                    )
                  )}
                </div>
              </React.Fragment>
            }
        </div>
        }
    </div>
  )
}

export default StoryDescription;