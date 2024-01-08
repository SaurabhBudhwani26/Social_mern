const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js')

// Register User

const register = async (req,res) =>{
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,

            
        } = req.body;

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impression: Math.floor(Math.random() * 10000)
        })

        const savedUser = await newUser.save()
        res.status(201).json({msg: "User successfully registered"})

    }catch(err){
        res.status(500).json({err: err.message})
    }
}

// Logging in

const login = async (req,res) =>{

    try{
        const {email, password} = req.body;
        let user = await User.findOne({ email: email })

        if(!user){
            return res.status(400).json({err: "User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({err: "Invalid Credentials"})
        }

        const token = jwt.sign({email: user.email, password: user.password}, process.env.JWT_SECRET);

        delete user.password;
        

        res.status(200).json({
            user,
            token
        })

    }catch(err){
        res.status(500).json({
            err: err.message
        })
    }
}

module.exports = {
    register,
    login
}