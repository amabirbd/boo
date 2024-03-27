'use strict';

const express = require('express');
const Comment = require('../models/commentModel');

// const router = express.Router();

// Create a comment
const createComment = async (req, res) => {
    const comment = new Comment({
        title: req.body.title,
        body: req.body.body,
        castedVoteType: req.body.castedVoteType,
        mbtiVote: req.body.mbtiVote,
        enneagramVote: req.body.enneagramVote,
        zodiacVote: req.body.zodiacVote,
        profile: req.body.profile
    });

    try {
        const newComment = await comment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Fetch comments with sorting and filtering options
const getComments = async (req, res, next) => {
    try {
        const sortBy = req.query.sort;
        const filterBy = req.query.filter;

        console.log(`Filtering by ${filterBy}, Sorting by ${sortBy}`);

        let query = Comment.find({ castedVoteType: filterBy});

        // // Filtering options
        if (filterBy && ['mbti', 'enneagram', 'zodiac'].includes(filterBy)) {
            query = query.where('castedVoteType').equals(filterBy);
        }

        // Sorting options
        if (sortBy === "recent") {
            query = query.sort({ createdAt: -1 }); // Sort by most recent
        } else if (sortBy === "best") {
            query = query.sort({ likes: -1 }); // Sort by most number of likes
        }

        const comments = await query.exec();
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }};

// Handle liking a comment
const likeComment = async (req, res) => {
    try {
        const commentId = req.params.commentId;

        // Find the comment by its ID
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        comment.likes += 1;

        await comment.save();

        res.json(comment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }};

module.exports = {
    createComment,
    getComments,
    likeComment
};
