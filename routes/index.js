const express = require('express')
const router = express.Router()
const { ensureAuthenticated, Authenticated } = require('../config/auth')

// User Model
const User = require('../Models/User')

// welcome page
router.get('/', Authenticated ,(req,res) => res.render('welcome'))

// All member page
router.get('/pekerja', (req, res) => {
    User.find({},(err, data) => {
        // note that data is an array of objects, not a single object!
        res.render('pekerja', {
            data
        })
    })
})

//dashboard page
router.get('/dashboard/', ensureAuthenticated, (req, res) =>
    res.render('dashboard', {
        name: req.user.name
    }))


module.exports = router