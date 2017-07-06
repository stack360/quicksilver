## Register

`POST` `/user/register`

#### Request Body

> No extra headers needed

```json
{
    "username": "z",
    "email": "simonzg@gmail.com",
    "password":"123456"
}
```

#### Response: 200 OK

```json
{
  "data": {
    "email": "snzg@gmail.com",
    "id": "594b655673a0b378708c6f9b",
    "role": "customer",
    "username": "g"
  }
}
```

#### Response: 400 BAD REQUEST

> This response is returned for exist username or email

```json
{
  "code": "BAD_REQUEST",
  "traceback": "some traceback",
  "error": "username already exist"
}
```
