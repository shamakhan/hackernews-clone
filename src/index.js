import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store';
import * as serviceWorker from './serviceWorker';
import { fromJS } from 'immutable';

const initialState = global.window && global.window.__INITIAL_STATE__
if (initialState) {
  console.log({initialState});
  initialState.stories = fromJS(initialState.stories);
}
const store = configureStore(initialState);

ReactDOM.hydrate(
  <Provider store={ store }>
    <App />
  </Provider>,
  // eslint-disable-next-line no-undef
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
