import React from 'react';
import './style.scss';

const StoryListFooter = () => {
  return (
    <tfoot>
      <tr>
        <td colSpan="4">
          <div className="pagination-buttons">
            <button>Previous</button>
            <button>Next</button>
          </div>
        </td>
      </tr>
    </tfoot>
  )
}

export default StoryListFooter;