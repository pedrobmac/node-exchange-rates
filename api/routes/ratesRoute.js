const { Router } = require('express')
const RatesController = require('../controllers/RatesController')

const router = Router()

router
    .get('/exchange-rate', RatesController.obtainRates)

module.exports = router