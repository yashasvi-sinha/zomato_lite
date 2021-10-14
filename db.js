const mongoose = require('mongoose')
const DB_URL = process.env.DATABASE_URL

async function dbInit(){
    await mongoose.connect(DB_URL)
}

module.exports = {
    dbInit
}

