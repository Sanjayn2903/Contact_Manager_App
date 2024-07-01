const User = require("../models/userModel")
const bcrypt = require('bcrypt')
const asyncHandler = require
('express-async-handler')
const jwt = require('jsonwebtoken')
const registerUser = asyncHandler(async(req,res)=>{
    console.log("comes")
    const {username,email,password}=req.body
    if(!username || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }
    const userAvailable = await User.findOne({email})
    console.log("comes here");
    if(userAvailable){
        console.log("comes here");
        res.status(400)
        throw new Error('User already exists')
    }
     const hashedPassword = await bcrypt.hash(password,10)
     console.log("Hashed passwprd",hashedPassword);
     const user = await User.create({
        username,
        email,
        password:hashedPassword
     })
    
     console.log(`user created ${user}`)
     if(user){
        res.status(201).json({_id: user.id,email:user.email})
     }
     else{
        res.status(400)
        throw new Error("user data is not valid")
     }
    res.json({meassage:"Register the user"})
})

const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("all fields are mandatory");
    }
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id
            }
        },process.env.ACCESS_TOKEN_SECRET,
               {expiresIn:"15m"});
        res.status(200).json({accessToken});
    }
        else{
            res.status(401)
            throw new error ("email or password is not valid")
        }

})

const currentUser =  asyncHandler(async(req,res)=>{
    res.json(req.user)
})


module.exports = {registerUser,loginUser,currentUser}