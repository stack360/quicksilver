## Save / Get to_address

`POST` or `GET` `/shipment/:shipment_id/to_address`

#### Request Body

> Request Body is only need for POST request


```json
{
  "name":"jessy",
  "street1":"3970 the woods dr",
  "street2":"",
  "city":"san jose",
  "country":"US",
  "zip":"95136",
  "state":"CA",
  "phone":"4083339999"
}
```

#### Extra Headers (Must provided one of following)

* X-Auth-Token
* X-Auth-Guest-Id

#### Response: 200 OK

```json
{
  "data": {
    "to_address": {
      "city": "san diego",
      "name": "jessy",
      "zip": "95136",
      "country": "US",
      "phone": "4083339999",
      "state": "CA",
      "street1": "3970 the woods dr",
      "id": "594b5fba73a0b36f278d8f37"
    }
  }
}
```

#### Response: 400 BAD REQUEST

> This response is returned for invalid address.

```json
{
  "code": "ADDRESS_VALIDATION_ERROR",
  "traceback": "some traceback",
  "validations": [
    {
      "field": "address",
      "message": "Address not found",
      "code": "E.ADDRESS.NOT_FOUND",
      "suggestion": null
    }
  ],
  "error": "address is not deliverable"
}
```
