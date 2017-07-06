## Edit Address

`POST` `/address/:address_id`

#### Request Body

```json
{
  "street1": "somewhere over the moon",
  "city":"san jose",
  "name":"z",
  "phone":"403038302",
  "zip":"95136",
  "state":"california",
  "country":"united states"
}
```

#### Extra Headers (Must provide)

* X-Auth-Token

#### Response: 200 OK

```json
{
  "data": {
    "city": "san jose",
    "name": "z",
    "zip": "95136",
    "country": "united states",
    "phone": "403038302",
    "state": "california",
    "street1": "somewhere over the moon",
    "id": "5952d02073a0b39636ab2a24"
  }
}
```

#### Response: 403 Forbidden

```json
{
  "code": "UNKOWN_TO_SERVER",
  "traceback": "None",
  "error": "make sure either X-Auth-Token or X-Auth-Guest-Id is in your request"
}
```

#### Response: 401 Unauthorized

```json
{
  "code": "UNAUTHORIZED",
  "traceback": "some traceback",
  "error": "you don't have perssion to manage this address"
}
```
