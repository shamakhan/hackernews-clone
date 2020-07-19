import React from 'react';
import './style.scss';

const Loader = () => {
  return (
    <React.Fragment>
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td width="100%"></td>
      </tr>
      <tr>
        <td colSpan="4" className="loader-parent">
          <div className="loader"></div>
        </td>
      </tr>
    </React.Fragment>
  )
}

export default Loader;