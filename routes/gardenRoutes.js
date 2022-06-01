import express from 'express'
const router = express.Router()
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get().post()

export default router
