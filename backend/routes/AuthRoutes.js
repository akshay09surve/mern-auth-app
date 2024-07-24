const express = require('express');
const router = express.Router()
const {signupValidation, loginValidation} = require('../middlewares/AuthValidation');
const { signup, login } = require('../controllers/AuthController');

router.get('/ping', (req,res)=>{res.send('PONG')})

router.post('/login', loginValidation, login)

router.post('/signup', signupValidation, signup)

module.exports = router;