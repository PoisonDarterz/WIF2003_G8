const express = require('express');
const router = express.Router();
const Community = require('../models/community.model');

// GET all community posts
router.get('/posts', async (req, res) => {
  try {
    const communityPosts = await Community.find().populate('employee', 'id name profilePicURL');
    res.json(communityPosts);
  } catch (err) {
    console.error("Error getting community posts:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET a specific community post by postId
router.get('/posts/:postId', async (req, res) => {
  const { postId } = req.params;
  try {
    const communityPost = await Community.findOne({ postId: postId }).populate('employee', 'id name profilePicURL');
    if (!communityPost) {
      return res.status(404).json({ message: "Community post not found" });
    }
    res.json(communityPost);
  } catch (err) {
    console.error("Error getting community post:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST a new community post
router.post('/posts', async (req, res) => {
  try {
    const newCommunityPost = await Community.create(req.body);
    res.status(201).json(newCommunityPost);
  } catch (err) {
    console.error("Error creating community post:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE a specific community post by postId
router.delete('/posts/:postId', async (req, res) => {
  const { postId } = req.params;
  try {
    const deletedCommunityPost = await Community.findOneAndDelete({ postId: postId });
    if (!deletedCommunityPost) {
      return res.status(404).json({ message: "Community post not found" });
    }
    res.json({ message: "Community post deleted successfully" });
  } catch (err) {
    console.error("Error deleting community post:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST a new comment for a specific community post
router.post('/posts/:postId/comments', async (req, res) => {
  const { postId } = req.params;
  try {
    const communityPost = await Community.findOne({ postId: postId });
    if (!communityPost) {
      return res.status(404).json({ message: "Community post not found" });
    }
    // Assuming req.body contains the necessary data for creating a comment
    communityPost.comments.push(req.body);
    await communityPost.save();
    res.status(201).json(communityPost.comments[communityPost.comments.length - 1]);
  } catch (err) {
    console.error("Error creating comment:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST a new reply for a specific comment of a community post
router.post('/posts/:postId/comments/:commentId/replies', async (req, res) => {
  const { postId, commentId } = req.params;
  try {
    const communityPost = await Community.findOne({ postId: postId });
    if (!communityPost) {
      return res.status(404).json({ message: "Community post not found" });
    }
    const comment = communityPost.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    // Assuming req.body contains the necessary data for creating a reply
    comment.replies.push(req.body);
    await communityPost.save();
    res.status(201).json(comment.replies[comment.replies.length - 1]);
  } catch (err) {
    console.error("Error creating reply:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
