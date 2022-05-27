import asyncHandler from 'express-async-handler'
import  Blog from '../models/blogModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getBlogs = asyncHandler(async (req, res) => {
  console.log(req.body);
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

  const count = await Blog.countDocuments({ ...keyword })
  const blogs = await Blog.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ blogs, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  if (blog) {
    res.json(blog)
  } else {
    res.status(404)
    throw new Error('Blog not found')
  }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id)

  if (blog) {
    await blog.remove()
    res.json({ message: 'Blog removed' })
  } else {
    res.status(404)
    throw new Error('Blog not found')
  }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createBlog = asyncHandler(async (req, res) => {
  const blog = new Blog({
    name: 'Sample name',
    // price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    // brand: 'Sample brand',
    // category: 'Sample category',
    // countInStock: 0,
    numReviews: 0,
    // care:"Sample",
    description: 'Sample description',
  })

  const createdBlog = await blog.save()
  res.status(201).json(createdBlog)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateBlog = asyncHandler(async (req, res) => {
  const {
    name,
    // price,
    description,
    // care,
    image,
    // brand,
    // category,
    // countInStock,
  } = req.body

  const blog = await Blog.findById(req.params.id)

  if (blog) {
    blog.name = name
    // blog.price = price
    blog.description = description
    // blog.care=care
    blog.image = image
    // blog.brand = brand
    // blog.category = category
    // blog.countInStock = countInStock

    const updatedBlog = await blog.save()
    res.json(updatedBlog)
  } else {
    res.status(404)
    throw new Error('Blog not found')
  }
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createBlogReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const blog = await Blog.findById(req.params.id)

  if (blog) {
    const alreadyReviewed = blog.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    )

    if (alreadyReviewed) {
      res.status(400)
      throw new Error('Blog already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    blog.reviews.push(review)

    blog.numReviews = blog.reviews.length

    blog.rating =
    blog.reviews.reduce((acc, item) => item.rating + acc, 0) /
    blog.reviews.length

    await blog.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Blog not found')
  }
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({}).sort({ rating: -1 }).limit(3)

  res.json(blogs)
})

export  {
  getBlogs,
  getBlogById,
  deleteBlog,
  createBlog,
  updateBlog,
  createBlogReview,
  getTopBlogs,
}
