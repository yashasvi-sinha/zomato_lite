const mongoose = require('mongoose')
const DB_URL = `mongodb+srv://server_application:cVY8tgJZtdewbZbY@cluster0.xdoik.mongodb.net/zomato_lite?retryWrites=true&w=majority`

async function dbInit(){
    await mongoose.connect(DB_URL)
}

module.exports = {
    dbInit
}

