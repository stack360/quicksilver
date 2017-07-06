## List Payment for One Shipment

`GET` `/payment/:shipment_id/list`

#### Request Body: Empty

#### Extra Headers (Must provided one of following)

* X-Auth-Token
* X-Auth-Guest-Id

#### Response: 200 OK

```json
{
  "data": {
    "payments": [
      {
        "pp_payment_id": "PAY-7XX924913J582233VLFI26FA",
        "currency": "USD",
        "success": true,
        "total": 4.04
      },
      {
        "pp_payment_id": "PAY-1DJ49630EJ310490WLFI26JY",
        "currency": "USD",
        "success": false,
        "total": 4.04
      },
      {
        "pp_payment_id": "PAY-91M23119Y9392001WLFJJZZQ",
        "currency": "USD",
        "success": false,
        "total": 4.04
      },
      {
        "pp_payment_id": "PAY-8NG064906T0301847LFJKBKA",
        "currency": "USD",
        "success": false,
        "total": 4.04
      }
    ]
  }
}
```
