// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/comment');

// Create model
const Comment = mongoose.model('Comment', {
    name: String,
    message: String
});

// Get all comments
app.get('/comments', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(comments);
        }
    });
});

// Post comment
app.post('/comments', (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        message: req.body.message
    });

    comment.save(err => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(comment);
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});