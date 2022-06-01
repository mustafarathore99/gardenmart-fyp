import mongoose from 'mongoose'

const gardenSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String, required: true
    }, description: {
        type: String
    }, image: {
        type: String,
    }, rows: {
        type: Number, required: true
    }, cols: {
        type: Number, required: true,
    }, grid: [{
        r: {type: Number, required: true},
        c: {type: Number, required: true},
        plant: {
            type: String
        }
    }]
}, {
    timestamps: true,
})

const Garden = mongoose.model('Garden', gardenSchema)

export default Garden
