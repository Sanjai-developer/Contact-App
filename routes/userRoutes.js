const express = require('express');
const { registeruser, loginuser,getcurrentuser} = require('../controllers/userController');
const router = express.Router();
const {validateToken} = require('../middleware/validateTokenHandler');

router.post('/register',registeruser);
router.post('/login', loginuser);
router.get('/current', validateToken,getcurrentuser);

module.exports = router;