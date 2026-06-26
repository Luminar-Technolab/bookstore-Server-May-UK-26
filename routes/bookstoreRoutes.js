const express = require('express')
const userController = require('../controllers/userController')
const authenticationMiddleware = require('../middlewares/authenticationMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')

const router = new express.Router()

//global routes
//register
router.post('/register',userController.register)
//login
router.post('/login',userController.login)
//google login
router.post('/google-login',userController.googleLogin)

//AUTHORISED ROUTES

//user edit
router.put('/users/:id',authenticationMiddleware,multerMiddleware.single('picture'),userController.userProfileUpdate)

module.exports = router