## Execute Payment

`POST` `/payment/execute`

#### Request Body: Empty

```json
{
    "payment_id":"PAY-8NG064906T0301847LFJKBKA",
    "payer_id": "some payer id"
}
```

#### Extra Headers (Must provide one of following)

* X-Auth-Token
* X-Auth-Guest-Id

#### Response: 200 OK

```json
{
  "data": {
    "label_png_url": "https://easypost-files.s3-us-west-2.amazonaws.com/files/postage_label/20170627/b15411b65d324aaea971ae5d209ca0a9.png"
  }
}
```


#### Response: 500 Internal Server Error

```json
{
  "code": "PAYPAL_ERROR",
  "traceback": {
    "message": "Payer has not approved payment",
    "debug_id": "739390583319",
    "name": "PAYMENT_NOT_APPROVED_FOR_EXECUTION",
    "information_link": "https://developer.paypal.com/docs/api/payments/#errors"
  },
  "error": "Payer has not approved payment"
}
```
