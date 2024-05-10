const express = require('express');
const userRoter = require('./routes/userRouter')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const urlRouter = require('./routes/urlRouter');
const app = express();
const whitelist = ['http://localhost:5173','https://urlsortner-backend-z4gv.onrender.com']
app.use(cors(
    {
        origin(reqOrigin, callback){
            if(reqOrigin && whitelist.indexOf(reqOrigin) != -1){
                callback(null, true)
            }else{
                callback(null, true)
                // callback(new Error('Not allowed by'))
            }
        },
        credentials:true
    }
));
app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/user',userRoter);
app.use('/api/url',urlRouter);
module.exports = app;