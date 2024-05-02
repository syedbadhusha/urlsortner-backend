require('dotenv').config()

const MongoDBUrl = process.env.MongoDBUrl;
const PORT  = process.env.PORT;

module.exports = {MongoDBUrl,PORT};