import mongoose from 'mongoose'
// const { default: Reviews } = require('./ReviewModel')
const reviewSchema = mongoose.Schema({
    name: {type: String, required: true},
    rating: {type: Number, required: true},
    comment: {type: String, required: true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
}, {timestamps: true})


const blogSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
        // ref:`User`
    },
    name: {
        type: String
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0,
    },

}, {timestamps: true})

const Blog = mongoose.model('Blogs', blogSchema)
// module.exports=Blogs
export default Blog