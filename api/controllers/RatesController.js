const { RatesServices } = require('../services')
const ratesServices = new RatesServices()
const rate = require('../model/rates')

class RatesController {

  static async obtainRates(req, res) {
    const currencies = [
      req.query.from,
      req.query.to
    ]

    try {
      rate.verifyRequestedCurrencies(currencies)

      //const rates = await ratesServices.callFederalInstitute(currencies)
      //return res.status(200).json(rate.obtainRateFromFederalInstitute(currencies, rates))

      const rates = await ratesServices.callCentralBank()
      return res.status(200).json(rate.obtainRateFromCentralBank(currencies, rates))
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = RatesController