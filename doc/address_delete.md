## Delete Address

`DELETE` `/address/:address_id`

#### Request Body: Empty

#### Extra Headers (Must provide)

* X-Auth-Token

#### Response: 200 OK

```json
{
  "result":"success"
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
