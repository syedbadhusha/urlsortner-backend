const express = require('express');
const urlControllers = require('../controlleres/urlControllers');
const auth = require('../middleware/auth');
const urlRouter = express.Router();

urlRouter.post('/',auth.isAuth,urlControllers.createSortUrl);
urlRouter.get('/geturls',auth.isAuth,urlControllers.getAllUrl);
urlRouter.get('/:urlid',urlControllers.redirectUrl)
module.exports = urlRouter;