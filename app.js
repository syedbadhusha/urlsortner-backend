const express = require('express');
const userRoter = require('./routes/userRouter')
// const cors = require('cors');
const app = express();

app.use(express.json())
app.use('/api/user',userRoter)

module.exports = app;