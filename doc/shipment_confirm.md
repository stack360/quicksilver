## Confirm Shipment

`POST` `/shipment/:shipment_id/confirm`

#### Request Body: Empty

#### Extra Headers (Must provided one of following)

* X-Auth-Token
* X-Auth-Guest-Id

#### Response: 200 OK

```json
{
  "data":{
    "result":"success"
  }
}
```
