const express = require('express');
const { registeruser, loginuser,getcurrentuser} = require('../controllers/userController');
const router = express.Router();

router.post('/register',registeruser);
router.post('/login', loginuser);
router.get('/current', getcurrentuser);

module.exports = router;