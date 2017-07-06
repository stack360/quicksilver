## Create Payment

`POST` `/payment/:shipment_id/create`

#### Request Body: Empty

#### Extra Headers (Must provided one of following)

* X-Auth-Token
* X-Auth-Guest-Id

#### Response: 200 OK

```json
{
  "data": {
    "payment_id": "PAY-91M23119Y9392001WLFJJZZQ"
  }
}
```


#### Response: 500 Internal Server Error

```json
{
  "code": "PAYPAL_ERROR",
  "traceback": {
    "message": "Invalid request - see details",
    "debug_id": "1c7d73d3c6b5e",
    "information_link": "https://developer.paypal.com/docs/api/payments/#errors",
    "name": "VALIDATION_ERROR",
    "details": [
      {
        "field": "transactions[0]",
        "issue": "Item amount must add up to specified amount subtotal (or total if amount details not specified)"
      }
    ]
  },
  "error": "Invalid request - see details"
}
```
