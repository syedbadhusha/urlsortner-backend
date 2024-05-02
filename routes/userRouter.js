const express = require('express');
const userControllers = require('../controlleres/userControllers')
const userRoter = express.Router();

userRoter.post('/',userControllers.register)
module.exports =userRoter;