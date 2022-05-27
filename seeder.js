import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import blogs from './data/blogs.js'
import rentings from './data/renting.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Blog from './models/blogModel.js'
import Renting from './models/rentingModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await Blog.deleteMany()
    await Renting.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser }
    })

    await Product.insertMany(sampleProducts)

    //handle blogs
    const sampleBlogs = blogs.map((blog) => {
      return { ...blog, user: adminUser }
    })

    await Blog.insertMany(sampleBlogs)

    const sampleRentings = rentings.map((renting) => {
      return { ...renting, user: adminUser }
    })

    await Renting.insertMany(sampleRentings)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await Blog.deleteMany()
    await Renting.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
