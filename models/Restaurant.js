const mongoose = require('mongoose')

//Schema Definition
const RestaurantSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
    },
    avgRating: {
        type: Number,
        default: 0
    },
    contactNumber: {
        type: String,
        required: true
    },
    cuisine: String, //change to Enum later,
    imageURL: String

})

//creating Model
const RestaurantModel = mongoose.model('Restaurant', RestaurantSchema) //restarauntss

module.exports = RestaurantModel
