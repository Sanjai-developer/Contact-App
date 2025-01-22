const express = require('express');

const router = express.Router();

router.post('/register', (req, res) => {
    res.json({ message: "Register Route" });
});
router.post('/login', (req, res) => {
    res.json({ message: "Login Route" });
});
router.get('/current', (req, res) => {
    res.json({ message: "Current User Information" });
});

module.exports = router;