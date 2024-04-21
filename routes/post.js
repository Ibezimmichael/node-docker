const express = require('express');
const { getPosts, createPost, getOnePost, updatePost, deletePost } = require('../controllers/postController');

const router = express.Router();

router.route('/').get(getPosts).post(createPost);
router.route('/:id').get(getOnePost).put(updatePost).delete(deletePost);


module.exports = router;