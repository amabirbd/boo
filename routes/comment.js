'use strict';

const express = require('express');
const Comment = require('../models/commentModel')
const {
    createComment,
    getComments,
    likeComment
} = require('../controllers/commentController')

const router = express.Router();


module.exports = function() {

// Create a comment
router.post('/', createComment);

// Route to fetch comments with sorting and filtering options
router.get('/', getComments);

// Route to handle liking a comment
router.post('/like/:commentId',likeComment);

return router;
}

