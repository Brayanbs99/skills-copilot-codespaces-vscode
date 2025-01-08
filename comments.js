// Create Web server
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Get all comments
app.get('/comments', (req, res) => {
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading comments.json');
            return;
        }

        res.send(data);
    });
});

// Post a comment
app.post('/comments', (req, res) => {
    const newComment = req.body;
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading comments.json');
            return;
        }

        const comments = JSON.parse(data);
        comments.push(newComment);

        fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
            if (err) {
                res.status(500).send('Error writing comments.json');
                return;
            }

            res.send('Comment added');
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});