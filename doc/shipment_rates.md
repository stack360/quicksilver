## Get Rates

`GET` `/shipment/:shipment_id/rates`

#### Request Body: Empty

#### Extra Headers (Must provided one of following)

* X-Auth-Token
* X-Auth-Guest-Id

#### Response: 200 OK

> Notice: shortened response

```json
{
  "data": {
    "picked_rate_id": 0,
    "rates": [
      {
        "delivery_date_guaranteed": false,
        "delivery_days": 2,
        "service": "ParcelSelect",
        "est_delivery_days": 2,
        "retail_currency": "USD",
        "list_currency": "USD",
        "carrier": "USPS",
        "list_rate": "5.95",
        "retail_rate": "5.95",
        "id": 1
      },
      {
        "delivery_date_guaranteed": false,
        "service": "Express",
        "retail_currency": "USD",
        "list_currency": "USD",
        "carrier": "USPS",
        "list_rate": "21.18",
        "retail_rate": "23.75",
        "id": 2
      },
      {
        "delivery_date_guaranteed": false,
        "delivery_days": 2,
        "service": "First",
        "est_delivery_days": 2,
        "retail_currency": "USD",
        "list_currency": "USD",
        "carrier": "USPS",
        "list_rate": "2.77",
        "retail_rate": "2.85",
        "id": 3
      },
      {
        "delivery_date_guaranteed": false,
        "delivery_days": 1,
        "service": "Priority",
        "est_delivery_days": 1,
        "retail_currency": "USD",
        "list_currency": "USD",
        "carrier": "USPS",
        "list_rate": "5.95",
        "retail_rate": "6.65",
        "id": 4
      }
    ]
  }
}
```
