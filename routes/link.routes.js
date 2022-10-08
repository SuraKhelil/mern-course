const {Router} = require('express')
const config = require('config')
const shortid = require('shortid')
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', auth,  async (req, res)=> {
    try {
        const baseUrl = config.get('baseUrl')
        const { from } = req.body
        const code = shortid.generate()
        const exsisting = await Link.findOne({from})
        if(exsisting) {
            return res.json({link: exsisting})
        }
        const to = baseUrl + '/t/' + code
        const link = new Link({
            code, to, from, owner: req.user.userId
        })
        await link.save()
        res.status(201).json({link})
    }catch(e) {
        res.status(500).json({message: e.message})
    }
})



router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({owner: req.user.userId}) //???
        res.json(links)
    } catch(e) {
        res.status(500).json({message: e.message})
    }
})

router.get('/:id', auth,  async (req, res) => {
    try {
        const links = await Link.findById(req.params.id) //???
        res.json(links)
    } catch(e) {
        res.status(500).json({message: e.message})
    }
})

module.exports = router