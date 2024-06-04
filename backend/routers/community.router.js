const express = require("express");
const router = express.Router();
const Community = require("../models/community.model");
const Employee = require("../models/employee.model");
const mongoose = require("mongoose");

// GET all community posts
router.get("/posts", async (req, res) => {
  try {
    const communityPosts = await Community.find()
    res.json(communityPosts);
  } catch (err) {
    console.error("Error getting community posts:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET a specific community post by ID
router.get("/posts/:postId", async (req, res) => {
    const { postId } = req.params;
    try {
        const communityPost = await Community.findOne({ postId: new mongoose.Types.ObjectId(postId) });
        if (!communityPost) {
            return res.status(404).json({ message: "Community post not found" });
        }
        res.json(communityPost);
    } catch (err) {
        console.error("Error getting community post:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// GET all comments for a specific community post
router.get("/posts/:postId/comments", async (req, res) => {
    const { postId } = req.params;
    try {
        const communityPost = await Community.findOne({ postId: new mongoose.Types.ObjectId(postId) });
        if (!communityPost) {
            return res.status(404).json({ message: "Community post not found" });
        }
        res.json(communityPost.comments);
    } catch (err) {
        console.error("Error getting comments:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// POST a new community post
router.post("/posts", async (req, res) => {
    try {
        const { employeeId, postImageSrc, postCaption } = req.body;
        // Find the employee
        const employee = await Employee.findOne({ id: employeeId });
        console.log("LOGGGG", employee);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // Create new community post
        console.log("ID", employee.id);
        const newCommunityPost = await Community.create({
            employee: {
                id: employee.id,
                name: employee.name,
                profilePicURL: employee.profilePicURL,
            },
            postImageSrc,
            postCaption,
        });

        console.log(newCommunityPost);

        res.status(201).json(newCommunityPost);
    } catch (err) {
        console.error("Error creating community post:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// POST a new comment for a specific community post
router.post("/:postId/comments", async (req, res) => {
    const { postId } = req.params;
    const { employeeId, commentText } = req.body;
    console.log("hi");
    try {
        // Find the employee
        const employee = await Employee.findOne({ id: employeeId });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // Find the community post
        const communityPost = await Community.findOne({
            postId: new mongoose.Types.ObjectId(postId),
        });
        if (!communityPost) {
            return res
                .status(404)
                .json({ message: "Community post not found" });
        }

        // Add comment to the post
        communityPost.comments.push({
            employee: {
                id: employee.id,
                name: employee.name,
                profilePicURL: employee.profilePicURL,
            },
            commentText,
        });

        await communityPost.save();

        res.status(201).json(communityPost);
    } catch (err) {
        console.error("Error creating comment:", err);
        res.status(500).json({ message: "Server error" });
    }
});

//POST a new like or decrease a like for a specific community post
router.post("/posts/:postId/like", async (req, res) => {
    const { postId } = req.params;
    try {
        // Find the community post
        const communityPost = await Community.findOne({
            postId: new mongoose.Types.ObjectId(postId),
        });
        if (!communityPost) {
            return res
                .status(404)
                .json({ message: "Community post not found" });
        }

        // Increment the likes count or decrement the likes count
        if(req.body.like === "like") {
            communityPost.likes += 1;
        } else if(req.body.like === "dislike") {
            communityPost.likes -= 1;
        }

        await communityPost.save();

        res.status(201).json(communityPost);
    } catch (err) {
        console.error("Error liking post:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// POST a new reply for a specific comment of a community post
router.post("/posts/:postId/comments/:commentId/replies", async (req, res) => {
    const { postId, commentId } = req.params;
    const { employeeId, replyText } = req.body;

    try {
        // Find the employee
        const employee = await Employee.findOne({ id: employeeId });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // Find the community post
        const communityPost = await Community.findOne({postId : new mongoose.Types.ObjectId(postId)});
        if (!communityPost) {
            return res
                .status(404)
                .json({ message: "Community post not found" });
        }

        // Find the comment
        const comment = communityPost.comments.id(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Add reply to the comment
        comment.replies.push({
            employee: {
                id: employee.id,
                name: employee.name,
                profilePicURL: employee.profilePicURL,
            },
            replyText,
        });

        await communityPost.save();

        res.status(201).json(communityPost);
    } catch (err) {
        console.error("Error creating reply:", err);
        res.status(500).json({ message: "Server error" });
    }
});



module.exports = router;