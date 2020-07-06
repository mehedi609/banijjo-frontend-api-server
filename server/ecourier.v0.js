const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('ecourier api')
})


module.exports = router