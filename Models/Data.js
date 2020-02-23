const mongoose = require('mongoose')

const DataSchema  = new mongoose.Schema({
    codeName: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    departement: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})


const Data = mongoose.model('Data', DataSchema)
module.exports = Data