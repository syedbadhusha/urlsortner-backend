const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const urlSchma = new mongoose.Schema({
    userId:ObjectId,
    urlLink:String,
    sortUrlLink:String,
    date:Date,
    clickedCount:Array
})
module.exports = mongoose.model('Url',urlSchma,'urls');