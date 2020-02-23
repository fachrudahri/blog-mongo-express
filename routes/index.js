const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { ensureAuthenticated, Authenticated } = require('../config/auth')

// User Model
const User = require('../Models/User')

// Data Model
const Data = require('../Models/Data')

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
// router.get('/dashboard/', ensureAuthenticated, (req, res) =>
//     res.render('dashboard', {
//         name: req.user.name
//     }))

router.get('/dashboard/', ensureAuthenticated, (req, res) =>{
    Data.find({},(err,result) => {
        res.render('dashboard', {
            result
        })
    })
})

router.get('/dashboard/:_id',ensureAuthenticated,(req, res) => {
    Data.findById(mongoose.Types.ObjectId(req.params._id)).then(datafound => {

            res.render('detail', {codename: datafound.codeName ,name: datafound.name, departement: datafound.departement, date: datafound.date})
    }).catch(err => console.log(err))
})

router.get('/dashboard/:_id/delete', ensureAuthenticated, (req, res) => {
    Data.findByIdAndDelete(mongoose.Types.ObjectId(req.params._id)).then(found => {
        req.flash('success_msg', 'Data Asset berhasil di hapus')
        res.redirect('/dashboard')
    }).catch(err => console.log(err))
})

// router.get('/dashboard/:codename', (req, res) => {
//     Data.findOne({codename: req.params.codeName}).then(data => {
//         if(!data) {
//             res.redirect('/dashboard')
//         }
//         else {
//             console.log(data)
//         }
//     })
// })



module.exports = router