## Start Shipment

`POST` `/shipment/start`

#### Request Body: Empty

#### Extra Request Header (Optional)

* X-Auth-Guest-Id
* X-Auth-Token

#### Response: 200 OK

> Request sent without any extra header, server will issue a `guest_id` for later reference. This shipment belongs to newly created `Guest`.

```json
{
  "extras": {
    "guest_id": "594b0d2d73a0b3532b8b2d3d"
  },
  "data": {
    "shipment_id": "594b0d2d73a0b3532b8b2d3e"
  }
}
```


#### Response: 200 OK

> Request sent with valid `X-Auth-Guest-Id` header. This shipment belongs to current `Guest`.

```json
{
  "extras": {},
  "data": {
    "shipment_id": "594b5a3673a0b36882e532ff"
  }
}
```

#### Response: 200 OK

> Request sent with `X-Auth-Token` header. This shipment belongs to current `User`.

```json
{
  "extras": {},
  "data": {
    "shipment_id": "594b5a3673a0b36882e532ff"
  }
}
```
