const express = require('express');
const { getPosts, createPost, getOnePost, updatePost, deletePost } = require('../controllers/postController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getPosts).post(protect, createPost);
router.route('/:id').get(protect, getOnePost).put(protect,updatePost).delete(protect, deletePost);


module.exports = router;