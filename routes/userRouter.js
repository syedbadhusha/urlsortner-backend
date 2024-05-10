const express = require('express');
const userControllers = require('../controlleres/userControllers');
const auth = require('../middleware/auth');
const userRoter = express.Router();

userRoter.post('/',userControllers.register)
userRoter.put('/useractivation',userControllers.verifyAccount)
userRoter.post('/login',userControllers.login)
userRoter.get('/currentuser',auth.isAuth,userControllers.currentUser)
userRoter.get('/logout',auth.isAuth,userControllers.logOut)
userRoter.post('/sendforgotmail',userControllers.sendFogotMail)
userRoter.put('/resetPassword',userControllers.resetPassword)
module.exports = userRoter;