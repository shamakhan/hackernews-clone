import React from 'react';
import './style.scss';
import { useSelector, useDispatch } from 'react-redux';
import { changePage, fetchStories } from '../../store/actions/storyActions';

const StoryListFooter = () => {
  const {page, totalPages} = useSelector((state) => ({
    page: state.stories.getIn(['pagination', 'page']),
    totalPages: state.stories.getIn(['pagination', 'totalPages'])
  }));

  const dispatch = useDispatch();

  const onPageChange = (diff) => {
    dispatch(changePage(page+diff));
    dispatch(fetchStories(page+diff));
  }

  return (
    <tfoot>
      <tr>
        <td colSpan="4">
          <div className="pagination-buttons">
            <button disabled={ page === 1 } onClick={ () => onPageChange(-1) }>Previous</button>
            <button disabled={ page === totalPages } onClick={ () => onPageChange(1) }>Next</button>
          </div>
        </td>
      </tr>
    </tfoot>
  )
}

export default StoryListFooter;