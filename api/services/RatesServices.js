const axios = require('axios')

class RatesServices {
    constructor(modelName) {
        this.modelName = modelName
    }

    async obtainFromFederalInstitute(currencies) {
        const address = `https://federal-institute.sandbox.swing.dev/rates/?base=${currencies.from}&target=${currencies.to}`
        try {
            const rates = await axios.get(address)
            return rates.data
        } catch (error) {
            return error.message
        }
    }
}

module.exports = RatesServices