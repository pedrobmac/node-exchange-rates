const axios = require('axios')

class RatesServices {
    constructor(modelName) {
        this.modelName = modelName
    }

    async obtainFromFederalInstitute(currencies) {
        const address = `https://federal-institute.sandbox.swing.dev/rates/?base=${currencies.from}&target=${currencies.to}`
        const rates = await axios.get(address)
        return rates.data
    }

    async obtainFromCentralBank() {
        const address = "https://central-bank.sandbox.swing.dev/exchange/v1/"
        const rates = await axios.get(
            address, {
            headers: {
                'X-APIKEY': `SWING`
            }
        })
        return rates.data
    }
}

module.exports = RatesServices