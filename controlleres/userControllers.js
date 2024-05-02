const User = require('../models/users')
const bcrypt = require('bcrypt')
const userControllers = {
    register:async (req,res)=>{
        try{
            const {firstName,lastName,userName,password} = req.body
            // check if user exist
            const user = await User.findOne({userName})
            if(user){
                return res.status(400).json({message:`${user.userName} User Already Exists`})
            }
            // Hashing password
            const passwordHash = await bcrypt.hash(password,10)
            const newUser = new User({
                firstName,
                lastName,
                userName,
                passwordHash
            })
            const savedUser = await newUser.save()
            res.status(200).json({message:'User Created Successfully', user:savedUser});

        }catch(error){
            res.status(500).json({message:error.message})
        }
    }
}

module.exports = userControllers