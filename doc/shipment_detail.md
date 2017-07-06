## Save / Get Detail

`POST` or `GET` `/shipment/:shipment_id/detail`

#### Request Body

> Request Body is only need for POST request

```json
{
    "width": 2.3,
    "length": 3.4,
    "height": 3.4,
    "weight": 5,
    "insured": true,
    "insured_value": 500
}
```

#### Extra Headers (Must provided one of following)

* X-Auth-Token
* X-Auth-Guest-Id

#### Response: 200 OK

```json
{
  "data": {
    "weight": 5,
    "width": 2.3,
    "insured_value": 500,
    "height": 3.4,
    "insured": true,
    "length": 3.4
  }
}
```
