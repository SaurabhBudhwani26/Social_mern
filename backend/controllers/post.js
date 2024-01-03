const Post = require('../models/Post.js');
const User = require('../models/User.js');


// Create controllers
const createPost = async(req,res) => {

    try{
        const {userId, description, picturePath} = req.body;
        const user = await User.findByid(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastname: user.lastName,
            location: user.loaction,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })
        
        await newPost.save();

        const post = await Post.find()

        res.status(201).json(post)

    }catch(err){
        res.status(409).json({message: err.message});
    }
}

// Read controllers
const getFeedPosts = async (req, res) => {
    try{
        const post = await Post.find()

        res.status(200).json(post)

    }catch(err){
        res.status(404).json({message: err.message});
    }
}

const getUserPosts = async (req, res) => {
    try{
        const {userId} = req.params;
        const post = await Post.find({userId: userId})
        res.status(200).json(post)
    }catch(err){
        res.status(404).json({message: err.message});
    }   
}

// Update controllers
const likePost = async (req, res) => {
    try{
        const {id} = req.params;
        const {userId} = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId)

        if(isLiked){
            post.likes.delete(userId)
        }else{
            post.likes.set(userId, true);
        }


        const updatedPost = await Post.findByIDAndUpdate(
            id,
            {likes: post.likes},
            {new: true}
        )

        res.status(200).json(updatedPost);

        
    }catch(err){
        res.status(404).json({message: err.message});
    }
}

module.exports = {
    createPost,
    getFeedPosts,
    getUserPosts,
    likePost
}



        
        