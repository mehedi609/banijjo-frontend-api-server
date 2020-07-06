const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
const { query } = require('../db_config')

router.get('/', async (req, res) => {
    res.send('ecourier api')
})


module.exports = router