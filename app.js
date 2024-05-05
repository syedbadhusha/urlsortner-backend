const express = require('express');
const userRoter = require('./routes/userRouter')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const app = express();

app.use(cors());
app.use(cookieParser())
app.use(morgan('dev'))
app.use(express.json())

app.use('/api/user',userRoter)

module.exports = app;