const express = require("express");
const router = express.Router();
const Community = require("../models/community.model");
const Employee = require("../models/employee.model");
const mongoose = require("mongoose");
const multer = require('multer');
const { BlobServiceClient } = require("@azure/storage-blob");
require("dotenv").config();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // Set file size limit to 1MB
});

const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.CONNECTION_STRING
);
const containerClientPostImage = blobServiceClient.getContainerClient("communitypost");


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

const sanitizeBlobName = (name) => {
    // Replace spaces with hyphens
    let sanitized = name.replace(/ /g, '-');
    // Remove invalid characters
    sanitized = sanitized.replace(/[^\w.-]/g, '');
    // Encode the name
    sanitized = encodeURIComponent(sanitized);
    return sanitized;
};

// POST a new community post
router.post("/posts", upload.single("postImage"), async (req, res) => {
    try {
        const { employeeId, postCaption } = req.body;
        const file = req.file;
        let postImageSrc = '';

        // Upload the image if it exists
        if (file) {
            const originalName = sanitizeBlobName(file.originalname);
            const blobName = Date.now() + "-" + originalName;
            const blockBlobClient = containerClientPostImage.getBlockBlobClient(blobName);
            await blockBlobClient.uploadData(file.buffer, {
                blobHTTPHeaders: {
                    blobContentType: file.mimetype,
                },
            });
            postImageSrc = blockBlobClient.url;
        }

        // Find the employee
        const employee = await Employee.findOne({ id: employeeId });
        if (!employee) {
            console.log("Employee not found with id:", employeeId); // Logging
            return res.status(404).json({ message: "Employee not found" });
        }

        // Generate a unique postId
        const postId = new mongoose.Types.ObjectId();

        // Create new community post
        const newCommunityPost = await Community.create({
            postId, // Set the unique postId
            employee: {
                id: employee.id, 
                name: employee.name,
                profilePicURL: employee.profilePicURL,
            },
            postImageSrc, // Save the URL of the uploaded image
            postCaption,
        });

        console.log("New community post created:", newCommunityPost); // Logging

        res.status(201).json(newCommunityPost);
    } catch (err) {
        console.error("Error creating community post:", err); // Detailed logging
        res.status(500).json({ message: "Server error", error: err.message });
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