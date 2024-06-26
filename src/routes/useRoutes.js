const express = require('express')
const router = express.Router();
const userController = require('../controllers/UserController');
console.log('oi')

router.post('/singup', userController.CreateNewUser);
router.post('/singin', userController.LoginUser);

module.exports = router;