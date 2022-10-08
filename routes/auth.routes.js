const {Router} = require('express')
const bcrypt = require('bcrypt')
const { check, validationResult } = require('express-validator')
const config = require('config')
const jwt  = require('jsonwebtoken')
const User = require('../models/User')
// const { check, validationResult } = require('express-validator')
const router = Router()

router.post(
    '/register', 
    [
        check('email', "Email is not correct").isEmail(),
        check('password', "Length of password must be 6 symbol at least")
            .isLength({min: 6})
    ],
    async (req, res) => {
    try {
        console.log('req', req.body)
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Wrong parametrs"
            })
        }
        const { email, password } = req.body
        const candidate = await User.findOne({email: email})
        if(candidate) {
            return res.status(400).json({message: "User has been excited"})
        }
    
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password: hashedPassword})
        await user.save()
        res.status(201).json({message: "User has been created"})
    } catch(e) {
        res.status(500).json({message: e.message})
    }
})

router.get(
    '/register',
    async (req, res) => {
    try {
        
        res.status(201).json({message: "User has been created"})
    } catch(e) {
        // res.status(500).json({message: e.message})
    }
})

router.post(
    '/login', 
    [
        check('email', "Email is not correct").isEmail(),
        check('password', "Length of password must be 6 symbol at least")
            .isLength({min: 6})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Wrong parametrs"
                })
            }
            const { email, password } = req.body
            const user = await User.findOne({email: email})
            if(!user) {
                return res.status(400).json({message: "User was not found"})
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) {
                return res.status(400).json({message: "Pass was not correct"})
            }
            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                { expiresIn: '1h'}
            )
            res.json({token, userId: user.id})
        } catch(e) {
            res.status(500).json({message: e.message})
        }
})
module.exports = router