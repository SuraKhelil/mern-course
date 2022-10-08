const jwt = require('jsonwebtoken')
const config = require('config')

 module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS') {
        return next()
    }
    try {
        const token = req.headers.authorization.split('Bearer ')[1] // "Bearer TOKEN"
        //console.log("token", token)
        if (!token) {
            res.status(401).json({message:"Not Authorization"})
        }
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded
        // console.log("req", req)
        next()
    } catch(e) {
        res.status(401).json({message:"Not Authorization"})
    }
}