import { createStore, compose, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunkMiddleware from 'redux-thunk';

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunkMiddleware),
    // process.env.NODE_ENV === 'development' ?  (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) : null
  ),
);
const enhancer = global.window && global.window.__REDUX_DEVTOOLS_EXTENSION__ && global.window.__REDUX_DEVTOOLS_EXTENSION__();

export default function configureStore(preloadedState = {}) {
  return createStore(
    reducers,
    preloadedState,
    compose(
      applyMiddleware(thunkMiddleware),
      enhancer
    ),
  )
};