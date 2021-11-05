class Rate {
    constructor() {
        this.validCurrency = (currency) => {
            const acceptedCurrencies = [
                "USD",
                "EUR",
                "PLN",
                "SWD"
            ]
            return (acceptedCurrencies.indexOf(currency) >= 0)
        }
    }

    verifyRequestedCurrencies(currencies) {
        currencies.forEach(currency => {
            if (!this.validCurrency(currency)) {
                throw new Error(`${currency} is not an accepted currency`)
            }
        });
    }

    obtainRateFromFederalInstitute(currencies, rates){
        return this.convertOutput(currencies, rates.rate, rates.timestamp)
    }

    obtainRateFromCentralBank(currencies, rates) {
        let rate = 0
        let targetRatesArray = 0
        const timestamp = rates.time

        if (currencies[0] === "USD") {
            targetRatesArray = Object.values(rates[currencies[1]])
            rate = average(targetRatesArray)
        } else {
            const intermediateRatesArray = Object.values(rates[currencies[0]])
            const inverseIntermediateRate = (1 / average(intermediateRatesArray))

            if (currencies[1] === "USD") {
                rate = inverseIntermediateRate
            } else {
                targetRatesArray = Object.values(rates[currencies[1]])
                rate = average(targetRatesArray) * inverseIntermediateRate
            }
        }

        return this.convertOutput(currencies, rate, timestamp)
    }

    convertOutput(currencies, rate, timestamp) {
        return {
            from: currencies[0],
            to: currencies[1],
            rate: rate,
            timestamp: timestamp
        }
    }

}

function average(numbers) {
    const sum = numbers.reduce((acumulator, number) =>
        number + acumulator, 0)

    return sum / numbers.length
}

module.exports = new Rate()
