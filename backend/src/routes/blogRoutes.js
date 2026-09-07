import express from 'express';
import { getPosts, getPostBySlug, createPost, updatePost, deletePost } from '../controllers/blogController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:slug', getPostBySlug);
router.post('/', requireAuth, createPost);
router.put('/:id', requireAuth, updatePost);
router.delete('/:id', requireAuth, deletePost);

export default router;
