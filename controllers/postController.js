const Post = require("../models/Post")

const getPosts = async(req, res, next) => {
    try {
        const posts = await Post.find({}) 
        res.status(200).json({
            status: 'success',
            data: posts
        })
        
    } catch (error) {
        res.status(400).json({
            err: error.message
        });
    }
}

const getOnePost = async(req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json({
            status: 'success',
            data: post
        })
        
    } catch (error) {
        res.status(400).json({
            err: error.message
        });
    }
}

const createPost = async(req, res, next) => {
    const { title, body} = req.body;

    try {
        const post = await Post.create({
            title,
            body
        })
        res.status(200).json({
            status: 'success',
            data: post
        })
        
    } catch (error) {
        res.status(400).json({
            err: error.message
        });
    }
}

const updatePost = async(req, res, next) => {
    try {
        const posts = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        }) 
        res.status(200).json({
            status: 'success',
            data: posts
        })
        
    } catch (error) {
        res.status(400).json({
            err: error.message
        });
    }
}


const deletePost = async(req, res, next) => {
    try {
        const posts = await Post.findByIdAndDelete(req.params.id) 
        res.status(200).json({
            status: 'success',
        })
        
    } catch (error) {
        res.status(400).json({
            err: error.message
        });
    }
}

module.exports = {
    getPosts,
    getOnePost,
    createPost,
    updatePost,
    deletePost
}