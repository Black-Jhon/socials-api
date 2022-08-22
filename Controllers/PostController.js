import PostModel from "../Models/PostModel.js";

// Create Posts
export const createPost = async (req, res) => {
    const newPost = await new PostModel(req.body);

    try {
        await newPost.save();
        res.status(201).json("Post created successfully!");
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Get Post
export const getPost = async (req, res) => {
    const id = req.params.id;

    try {
        const post = await PostModel.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Get All Posts
export const getPosts = async (req, res) => {
    try {
        const posts = await PostModel.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Update Post
export const updatePost = async (req, res) => {
    const postId = req.params.id;
    const {userId} = req.body;

    try {
        const post = await PostModel.findById(postId);
        if (post.userId === userId) {
            await post.updateOne({$set: req.body});
            res.status(200).json("Post updated!");
        } else {
            res.status(403).json("Action forbidden!");
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Delete a Post
export const deletePost = async (req, res) => {
    const id = req.params.id;
    const {userId} = req.body;

    try {
        const post = await PostModel.findById(id);

        if (post.userId === userId) {
            await PostModel.deleteOne();
            res.status(200).json("Post deleted successfully!");
        } else {
            res.status(403).json("Action forbidden!");
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Like post
export const likePost = async (req, res) => {
    const id = req.params.id;
    const {userId} = req.body;

    try {
        const post = await PostModel.findById(id);

        if (!post.likes.includes(userId)) {
            await post.updateOne({$push: {likes: userId}});
            res.status(200).json("Post liked!");
        } else {
            await post.updateOne({$pull: {likes: userId}});
            res.status(200).json("Post unliked!");
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};
