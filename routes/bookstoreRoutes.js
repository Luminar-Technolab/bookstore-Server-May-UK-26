const express = require('express')
const userController = require('../controllers/userController')

const router = new express.Router()

//global routes
//register
router.post('/register',userController.register)

//AUTHORISED ROUTES


module.exports = router