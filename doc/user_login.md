## Login

`POST` `/user/login`

#### Request Body

> No extra headers needed

```json
{
    "username": "z",
    "password":"123456"
}
```

#### Response: 200 OK

```json
{
  "extras": {
    "expire_at": "2017-06-22 02:39:03",
    "token": "T_xoNIY1ouixHCQ"
  }
}
```

#### Response: 400 BAD REQUEST

> This response is returned for wrong username/password

```json
{
  "code": "UNAUTHORIZED",
  "traceback": "some traceback",
  "error": "Invalide username and/or password"
}
```
