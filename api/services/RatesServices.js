const axios = require('axios')

class RatesServices {
    constructor(modelName) {
        this.modelName = modelName
    }

    async callFederalInstituteAPI(currencies) {
        const address = `https://federal-institute.sandbox.swing.dev/rates/?base=${currencies[0]}&target=${currencies[1]}`
        const rates = await axios.get(address)
        return rates.data
    }

    async callCentralBankAPI() {
        const address = "https://central-bank.sandbox.swing.dev/exchange/v2/"
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