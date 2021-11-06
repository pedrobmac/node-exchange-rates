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
    } catch (error) {
      return res.status(400).json(error.message)
    }

    //TO DO - refactor using Strategy Design Pattern
    let requestErrors = []

    if(requestErrors.length >= 0){
      try{
        const rates = await ratesServices.callFederalInstituteAPI(currencies)
        return res.status(200).json(rate.obtainRateFromFederalInstitute(currencies, rates))
      }catch (error){
        requestErrors.push(error.message)
      }
    }

    if(requestErrors.length > 0){
      try{
        const rates = await ratesServices.callCentralBankAPI(currencies)
        return res.status(200).json(rate.obtainRateFromCentralBank(currencies, rates))
      }catch (error){
        requestErrors.push(error.message)
      }
    }

      return res.status(500).json({ error: requestErrors })

    // Testing implementation using Promises
    // const callFederalInstitute = new Promise((resolve, reject, response) => {
    //   const rates = ratesServices.callFederalInstituteAPI(currencies)
    //   if (typeof rates !== 'undefined' && rates !== null) {
    //     resolve(rates)
    //   } else {
    //     reject(response.statusText)
    //   }
    // })

    // callFederalInstitute.then((rates) => {
    //   return res.status(200).json(rate.obtainRateFromFederalInstitute(currencies, rates))
    // }).catch((error) => {
    //   console.log("Federal Institute API failed")
    //   return res.status(500).json({ error: error.statusText })
    // })

    // const callCentralBank = new Promise((resolve, reject, response) => {
    //   const rates = ratesServices.callCentralBankAPI()
    //   if (typeof rates !== 'undefined' && rates !== null) {
    //     resolve(rates)
    //   } else {
    //     reject(response.statusText)
    //   }
    // })

    // callCentralBank.then((rates) => {
    //   return res.status(200).json(rate.obtainRateFromCentralBank(currencies, rates))
    // }).catch((error) => {
    //   console.log("Central Bank API failed")
    //   return res.status(500).json({ error: error.statusText })
    // })

    // Promise.any([callFederalInstitute, callCentralBank])
    // .then((rates) => res.json(rates))
    // .catch((error) => res.json({ error: error }))
  }
}

module.exports = RatesController