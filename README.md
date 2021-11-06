Simple web API that allows to retrieve an exchange rate between two arbitrary currencies for the current moment through the route:

GET /exchange-rate

On success, the endpoint returns a JSON structure like the following:

```json
{
    "from": "PLN",
    "to": "EUR",
    "rate": 0.22,
    "timestamp": 1636159834
}
```

The API also validates the following supported currencies:
USD, EUR, PLN and SWD (Swap Dollar)

The actual exchange rates are retrieved from two 3rd party exchange rates APIs, for greater reliability:

GET https://federal-institute.sandbox.swing.dev/rates/?base=PLN&target=EUR
GET https://central-bank.sandbox.swing.dev/exchange/v2/ - processing the list to retrieve the desired rate

Next steps:
Refactor controller using Strategy Design Pattern to call the 3rd party APIs