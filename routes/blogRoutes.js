import express from 'express'
const router = express.Router()
import {
  getBlogs,
  getBlogById,
  deleteBlog,
  createBlog,
  updateBlog,
  createBlogReview,
  getTopBlogs,
} from '../controllers/blogController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getBlogs).post(protect, admin, createBlog)
router.route('/:id/reviews').post(protect, createBlogReview)
router.get('/top', getTopBlogs)
router
  .route('/:id')
  .get(getBlogById
    )
  .delete(protect, admin, deleteBlog)
  .put(protect, admin, updateBlog)

export default router
