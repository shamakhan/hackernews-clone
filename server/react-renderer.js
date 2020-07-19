const React = require('react')
const renderToString = require('react-dom/server').renderToString;
// const matchPath = require('react-router').matchPath;
const path = require('path');
const fs = require('fs');
const configureStore = require('../src/store');
const Provider = require('react-redux').Provider;
const initialState = {};

/**
 * Import our main App component
 * Remember it's exported as ES6 module, so to require it, you must call .default
 */
const App = require('../src/App').default;

exports = module.exports;

exports.render = (req, res, next) => {
      
      const filePath = path.resolve(__dirname, '..', 'build', 'index.html');

      fs.readFile(filePath, 'utf8', (err, htmlData) => {        
        if (err) {
          console.error('err', err);
          return res.status(404).end(); // WARNING: This 404 will be handled by Express server and won't be your React 404 component.
        }

        const location = req.url;

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

        const store = configureStore(initialState);

        /**
         * Convert JSX code to a HTML string that can be rendered server-side with
         * `renderToString` a method provided by ReactDOMServer
         *
         * This sets up the app so that calling ReactDOM.hydrate() will preserve the
         * rendered HTML and only attach event handlers. 
         * (https://reactjs.org/docs/react-dom-server.html#rendertostring)
         */
        const jsx = <Provider store={ store }><App /></Provider>;
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
      });
  };