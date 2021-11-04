const { RatesServices } = require('../services')
const ratesServices = new RatesServices()

class RatesController {

  static async obtainRates(req, res) {
    const currencies = {
      from: req.query.from,
      to: req.query.to
    }

    try {
      //const rates = await ratesServices.obtainFromFederalInstitute(currencies)
      const rates = await ratesServices.obtainFromCentralBank()
      return res.status(200).json(rates)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = RatesController