import asyncHandler from 'express-async-handler'
import Renting from '../models/rentingModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getRentings = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Renting.countDocuments({ ...keyword })
  const rentings = await Renting.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ rentings, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getRentingById = asyncHandler(async (req, res) => {
  const renting = await Renting.findById(req.params.id)

  if (renting) {
    res.json(renting)
  } else {
    res.status(404)
    throw new Error('Renting not found')
  }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteRenting = asyncHandler(async (req, res) => {
  const renting = await Renting.findById(req.params.id)

  if (renting) {
    await renting.remove()
    res.json({ message: 'Renting removed' })
  } else {
    res.status(404)
    throw new Error('Renting not found')
  }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createRenting = asyncHandler(async (req, res) => {
  const renting = new Renting({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    // care:"Sample",
    description: 'Sample description',
  })

  const createdRenting = await renting.save()
  res.status(201).json(createdRenting)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateRenting = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    // care,
    image,
    brand,
    category,
    countInStock,
  } = req.body

  const renting = await Renting.findById(req.params.id)

  if (renting) {
    renting.name = name
    renting.price = price
    renting.description = description
    // renting.care=care
    renting.image = image
    renting.brand = brand
    renting.category = category
    renting.countInStock = countInStock

    const updatedRenting = await renting.save()
    res.json(updatedRenting)
  } else {
    res.status(404)
    throw new Error('Renting not found')
  }
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createRentingReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const renting = await Renting.findById(req.params.id)

  if (renting) {
    const alreadyReviewed = renting.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Renting already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    renting.reviews.push(review)

    renting.numReviews = renting.reviews.length

    renting.rating =
    renting.reviews.reduce((acc, item) => item.rating + acc, 0) /
    renting.reviews.length

    await renting.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('renting not found')
  }
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopRentings = asyncHandler(async (req, res) => {
  const rentings = await Renting.find({}).sort({ rating: -1 }).limit(3)

  res.json(rentings)
})

export {
  getRentings,
  getRentingById,
  createRenting,
  deleteRenting,
  updateRenting,
  createRentingReview,
  getTopRentings,
}
