const jwt = require('jsonwebtoken')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const register = async(req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        })
        if (user) return res.status(400).json('user already exist')
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        await newUser.save()
        return res.status(201).json("user added")
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}
const login = async(req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        })
        if (!user) return res.status(404).json('user not found')

        const verifPassword = await bcrypt.compare(req.body.password, user.password)
        if (!verifPassword) return res.status(401).json('wrong password')
        const accesstoken = jwt.sign({
                id: user._id
            },
            process.env.JWT_SEC, { expiresIn: "3d" }
        )
        return res.status(200).json(accesstoken)


    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

module.exports = {
    register,
    login
}