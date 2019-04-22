var router = require('express').Router()
var userControllers = require('./user.controllers')
var userValidation = require('./user.validations')
var authMiddleware = require('../utilis/middleware/auth')
router.post('/register', userValidation.register, userControllers.register)
router.post('/login', userValidation.login, userControllers.login)
router.get('/me', authMiddleware.isAuthenticated, userControllers.me)
router.get('/logout', authMiddleware.isAuthenticated, userControllers.logout)
module.exports = router
