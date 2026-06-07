const mongoose = require('mongoose')
const config = require('../config')

async function connectDB() {
    try {
        await mongoose.connect(config.MONGO_URI)
        console.log('MongoDB Connected')
    } catch (e) {
        console.log('DB Error', e)
    }
}

module.exports = connectDB
