import express from 'express';
import fs from 'fs';
import path from 'path';

import React from 'react';
import ReactDomServer from 'react-dom/server';
import App from '../src/App';

const app = express();
const PORT = 5000;


app.use('^/$', (request, response, next) => {
  fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return response.status(500).send('Something went wrong.');
    }
    return response.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDomServer.renderToString(<App />)}</div>`
      )
    );
  })
});
    
  app.use(express.static(path.resolve(__dirname, '..', 'build')))
    
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
})