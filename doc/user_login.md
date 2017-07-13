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
    "data": {
        "email": "z@gmail.com",
        "id": "59669f2173a0b3162466b7ba",
        "last_login": "2017-07-12 15:25:31",
        "role": "customer",
        "username": "z"
    },
    "extras": {
        "expire_at": "2017-07-12 18:25:31",
        "token": "T_ouXjVmfDWIPsM"
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
