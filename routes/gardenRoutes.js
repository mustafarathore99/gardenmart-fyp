import express from 'express'

const router = express.Router()
import {getGardens, createGarden, updateGarden, getGarden} from '../controllers/gardenController.js'
import {protect, admin} from '../middleware/authMiddleware.js'

router.route('/')
    .get(protect, getGardens)
    .post(protect, createGarden);

router.route('/:id')
    .get(protect, getGarden)
    .put(protect, updateGarden);

export default router
