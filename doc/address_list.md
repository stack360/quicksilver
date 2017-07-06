## List Address for user

`GET` `/address`

#### Request Body: Empty

#### Extra Headers (Must provide)

* X-Auth-Token

#### Response: 200 OK

```json
{
  "data": {
    "addresses": [
      {
        "city": "san jose",
        "name": "han",
        "zip": "95136",
        "country": "united states",
        "phone": "403038302",
        "state": "california",
        "street1": "somewhere over the moon",
        "id": "5952ca3e73a0b391bd5377bd"
      },
      {
        "city": "san jose",
        "name": "han",
        "zip": "95136",
        "country": "united states",
        "phone": "403038302",
        "state": "california",
        "street1": "somewhere over the moon",
        "id": "5952d02073a0b39636ab2a24"
      }
    ]
  }
}
```
