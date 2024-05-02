const mongoose = require('mongoose')
const config = require('./utils/config')
const app =require('./app')

mongoose.connect(config.MongoDBUrl).then(()=>{
    console.log('Connected to Mongo DB')
    app.listen(config.PORT,()=>{
        console.log(`Server Running on port ${config.PORT}`)
    })
}).catch(()=>{
    console.log('Error connecting to Mongo DB')
})