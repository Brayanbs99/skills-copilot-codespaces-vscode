// Create web server
const express = require('express');
const app = express();
const port = 3000;
const commentData = require('./comments.json');

// Set up static files
app.use(express.static('public'));

// Set up view engine
app.set('view engine', 'ejs');

// Set up routes
app.get('/', (req, res) => {
  res.render('index', { comments: commentData });
});

// Set up port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});