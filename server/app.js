const express = require('express');
const fs = require('fs');
const path = require('path');

const reactRenderer = require('./react-renderer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use('^/$', reactRenderer.render())

    
app.use(express.static(path.resolve(__dirname, '../build')))
    
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
})