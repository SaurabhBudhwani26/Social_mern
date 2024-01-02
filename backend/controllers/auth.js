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
        res.status(201).json(savedUser)

    }catch(err){
        res.status(500).json({err: err.message})
    }
}

module.exports = {
    register
}