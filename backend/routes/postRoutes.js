const express = require("express")
const {verifyToken} = require('../middleware/auth.js')
const {getFeedPosts, getUserPosts, likePost} = require('../controllers/post.js')


const router = express.Router()

// Read routes
router.get('/', verifyToken, getFeedPosts);
router.get('/:userId', verifyToken, getUserPosts);


// Udpate Routes
router.patch("/:id/like", verifyToken, likePost);

module.exports = router;

