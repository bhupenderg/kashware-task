const User = require('../models/userModel')

const jwt = require('jsonwebtoken')

// Signup Controller
exports.signup = async function(req, res) {
    try{
        const user = await User.create(req.body)
        if(!user) {
            return res.status(400).json({
                status: "Fail",
                message: "Please come back later"
            })
        }
        else{
            res.status(201).json({
                status: "Success",
                message: "User created successfully"
            })
        }
    }

    catch(err) {
        res.status(400).json({
            status: "Fail",
            data: {
                message: err
            }
        })
    }
}

// Login Controller
exports.login = async function(req, res) {
    try{
        const user = await User.findOne({ email: req.body.email })
        
        console.log(user.email)
        console.log(req.body.password)
        if(req.body.email !== user.email) {
            return res.status(401).json({
                status: "Fail",
                message: "Either email or password are wrong!!!"
            })
        } else if(req.body.password !== user.password) {
            return res.status(401).json({
                status: "Fail",
                message: "Either email or password are wrong!!!"
            })
        }

        else {
            const token = await user.generateAuthToken()
            res.status(200).json({
                status: "Success",
                data: {
                    user,
                    token
                }
            })
        }
    }
    catch(err) {
        res.status(400).json({
            status: "Fail",
            data: {
                message: "Login Failed!!!"
            }
        })
    }
}

// For protecting routes
exports.auth = async (req, res, next) => {
    try{
        const token = req.header("Authorization").replace('Bearer ', '')
        console.log(token)
        const decoded = jwt.verify(token, 'thisismysecrettokenforthistask')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if(!user) {
            throw new Error()
        }

        req.user = user
        next()
        
    }
    catch(err) {
        res.status(401).send({ error: "Please login to proceed." })
        
    }
    
}