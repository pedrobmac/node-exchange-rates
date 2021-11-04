const bodyParser = require("body-parser")
const rates = require("./ratesRoute")


module.exports = app => {
    app.use(
        bodyParser.json(),
        rates
    )
}