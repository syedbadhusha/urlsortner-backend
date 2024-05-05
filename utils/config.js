require('dotenv').config()

const MongoDBUrl = process.env.MongoDBUrl;
const PORT  = process.env.PORT;
const JWT_Secret = process.env.JWT_Secret;
const SenderMailID = process.env.SenderMailID;
const SenderMailPassword = process.env.SenderMailPassword
const SenderName    = process.env.SenderName

module.exports = {MongoDBUrl,PORT,JWT_Secret,SenderMailID,SenderMailPassword,SenderName};