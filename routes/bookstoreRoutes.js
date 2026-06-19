const express = require('express')
const userController = require('../controllers/userController')

const router = new express.Router()

//global routes
//register
router.post('/register',userController.register)
//login
router.post('/login',userController.login)
//google login
router.post('/google-login',userController.googleLogin)

//AUTHORISED ROUTES


module.exports = router