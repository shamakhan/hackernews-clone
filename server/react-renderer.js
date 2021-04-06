const window = require('global/window');
const React = require('react');
const renderToString = require('react-dom/server').renderToString;
const path = require('path');
const fs = require('fs');
require('es6-promise').polyfill();
require('isomorphic-fetch');
const configureStore = require('../src/store').default;
const fromJS = require('immutable').fromJS;
const Provider = require('react-redux').Provider;
if (typeof global.window === 'undefined') {
  global.window = window;
  global.document = window.document;
}
const STORY_API = require('../src/store/actions/storyActions').STORY_API;
const url = `${STORY_API}&page=1&hitsPerPage=30`;
/**
 * Import our main App component
 * Remember it's exported as ES6 module, so to require it, you must call .default
 */
const App = require('../src/App').default;

exports = module.exports;

exports.render = () => (req, res, next) => {
      
      const filePath = path.resolve(__dirname, '..', 'build', 'index.html');

      fs.readFile(filePath, 'utf8', (err, htmlData) => {        
        if (err) {
          console.error('err', err);
          return res.status(404).end(); // WARNING: This 404 will be handled by Express server and won't be your React 404 component.
        }

        const location = req.url;
        const is404 = req._possible404;
        if (is404) {
          /**
           * Set the app's response to 404 OK (https://httpstatuses.com/404)
           */
          res.writeHead(404, { 'Content-Type': 'text/html' })
          console.log(`SSR of unrouted path ${req.path} (404 ahead)`)
        }
        else {
          /**
           * Set the app's response to 200 OK (https://httpstatuses.com/200)
           */
          res.writeHead(200, { 'Content-Type': 'text/html' })
          console.log(`SSR of ${req.path}`);
        }
        fetch(url).then(function(response) {
          if (response.status >= 400) {
            throw new Error('Bad response from server');
          }
          return response.json();
        }).then(function (data) {
          const initialState = {
            stories: fromJS({
              stories: {
                loading: false,
                data: data.hits.reduce((acc, story) => {
                  const storyId = story.objectID;
                  acc[storyId] = story;
                  return acc;
                }, {}),
              },
              pagination: {
                totalPages: data.nbPages,
                rows: 30,
                page: 1,
              },
              storyId: null
            })
          };
          const store = configureStore(initialState);
  
          /**
           * Convert JSX code to a HTML string that can be rendered server-side with
           * `renderToString` a method provided by ReactDOMServer
           *
           * This sets up the app so that calling ReactDOM.hydrate() will preserve the
           * rendered HTML and only attach event handlers. 
           * (https://reactjs.org/docs/react-dom-server.html#rendertostring)
           */
          const jsx = <Provider store={ store }><App ssr={ true } /></Provider>;
          const reactDom = renderToString(jsx);
  
          /**
           * inject the rendered app and it state 
           * into our html and send it
           */
          return res.end(
            htmlData.replace(
              '<div id="root"></div>',
              `<div id="root">${reactDom}</div>`
            ).replace(
              '__REDUX__',
              JSON.stringify(store.getState())
            )
          );
        })
        
      });
  };