## Show Payment Detail

`GET` `/payment/:payment_id`

#### Request Body: Empty

#### Extra Headers (Must provided one of following)

* X-Auth-Token
* X-Auth-Guest-Id

#### Response: 200 OK

```json
{
  "data": {
    "pp_payment_id": "PAY-8NG064906T0301847LFJKBKA",
    "currency": "USD",
    "total": 0,
    "success": true
  }
}
```

