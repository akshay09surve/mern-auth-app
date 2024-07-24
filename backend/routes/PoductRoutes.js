const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middlewares/Auth')

router.get('/', ensureAuthenticated, (req, res) => {
    console.log(`Logged in User :`, req.user)
    res.status(200).json([
        {
            name: 'Galaxy M31s',
            price: 18000
        },
        {
            name: 'Galaxy M35',
            price: 24000
        }
    ])
})

module.exports = router;