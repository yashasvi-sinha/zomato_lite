const mongoose = require('mongoose')

//Schema Definition
const UserSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

})

//creating Model
const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel
