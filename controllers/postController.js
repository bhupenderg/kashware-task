const Posts = require('../models/postModel')

// @exports Create a post
exports.createPost = async function(req, res) {

    try{
        const newPost = await Posts.create(req.body);

        res.status(201).json({
            status: 'Success',
            data: {
                post: newPost
            }
        })
    }

    catch(err) {
        res.status(400).json({
            status: 'Fail',
            message: err
        })
    }
}

// @exports Get all posts
exports.getPosts = async function(req, res) {
    try{
        const allPosts = await Posts.find()

        res.status(201).json({
            status: 'Success',
            data: {
                posts: allPosts
            }
        })
    }

    catch(err) {
        res.status(400).json({
            status: 'Fail',
            message: err
        })
    }
}

// @exports Update a post
exports.updatePost = async function(req, res) {
    try{
        const post = await Posts.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            status: 'Success',
            data: {
                updatedPost: post 
            }
        })
    }

    catch(err) {
        res.status(404).json({
            status: 'Fail',
            message: err
        })
    }
}