const UserModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signup = async (req, res)=>{
    try
    {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email })
        if (user)
        {
            return res.status(409).json({message: 'User already exists. Please login.', success: false})
        }
        const userModel = new UserModel({name, email, password})
        userModel.password = await bcrypt.hash(password, 10)
        userModel.save()
        res.status(200).json({message:'Signup successful', success: true})
    }
    catch (e)
    {
        res.status(500).json({message:'Internal server error', success: false})
    }
}

const login = async (req, res) => {
    try
    {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email })
        if (!user)
        {
            return res.status(403).json({message:'No user found with this email. Please signup.', success: false})
        }
        const passwordCorrect = await bcrypt.compare(password, user.password)
        if (!passwordCorrect)
        {
            return res.status(403).json({message:'Email or password is incorrect.', success: false})
        }

        const jwtToken = await jwt.sign(
            { email: user.email, _id: user._id, },
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )

        res.status(200).json({
            message: 'Login successful',
            success: true,
            jwtToken,
            email: user.email,
            name: user.name
        })
    }
    catch (e)
    {
        res.status(500).json({message:'Internal server error', success: false})
    }
}

module.exports = {
    signup,
    login
}