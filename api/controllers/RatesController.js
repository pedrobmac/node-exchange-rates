const { RatesServices } = require('../services')
const ratesServices = new RatesServices()

class RatesController {
  static async obtainRates(req, res) {
    const currencies = {
      from: req.query.from,
      to: req.query.to
    }
    try {
      const data = await ratesServices.obtainFromFederalInstitute(currencies)
      return res.status(200).json(data)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = RatesController