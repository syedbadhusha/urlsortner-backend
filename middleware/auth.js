const jwt = require('jsonwebtoken');
const user = require('../models/users');
const { JWT_Secret } = require('../utils/config');

const auth = {
    isAuth: async (req,res,next)=>{
        try{
            const token = req.cookies.token;
            if(!token){
                return res.status(500).json({message:'UnAuthorized'})
            }
            //Verify the token
            try{
                const decodedToken = jwt.verify(token,JWT_Secret)
                req.userId = decodedToken.id;
                next();
            }catch(error){
                return res.status(500).json({message:'Invalid Token'})
            }
        }catch(error){
            res.status(500).json({message:error.message})
        }
    }
}

module.exports=auth;