# API Docs

## Sample response

* Successful response

> data is always be returned
> extras is optional
> `user_role` could be only customer, admin or guest

```json
{
  "data": {
    "foo": "bar",
  },
  "extras":{
    "token_expire": false,
    "user_role": "customer",
    "guest_id": "G591a251973a0b1f2"
  }
}
```

* Error response

```json
{
  "code": "TOKEN_EXPIRE",
  "error": "some explainary text",
  "traceback": "traceback information"
}
```

## Prefix

All API URL is prefixed by `/api/v1`


## User Identity

`user_role` will always be returned in `extra` section

Every API call (except register/login) will need either a `token` or `guest_id` to access.
* If `token` was provided in request, `token_expire` is returned in `extra`
  - token expired : user is considered as **expired customer**, who need to log in again
  - token not expired : user is considered as **valid customer**
* If `guest_id` was provided in request, user is considered as **known guest**, nothing will be returned within `extra`
* If neither `token` nor `guest_id` was provided, user is considered as **unknown**, a new `guest_id` will be returned within `extra`


## Shipment API List

| Verb  | URL |  Note | Roles |
| ----- | ---------- | -- | -- |
| POST | [/shipment/start](doc/shipment_start.md) | First step of shipment creation, returns `shipment id` for later reference | customer, guest, unknown |
| POST, GET  | [/shipment/:shipment_id/from_address](doc/shipment_from_address.md)  | Save / Get `from_address` | customer, guest |
| POST, GET  | [/shipment/:shipment_id/to_address](doc/shipment_to_address.md)  | Save / Get `to_address` | customer, guest |
| POST, GET  | [/shipment/:shipment_id/detail](doc/shipment_detail.md)  | Save parcel `detail` | customer, guest |
| GET | [/shipment/:shipment_id/rates](doc/shipment_rates.md) | Get list of rates from chosen shipment | customer, guest |
| POST | [/shipment/:shipment_id/rates/:rate_id](doc/shipment_pick_rate.md) | Pick rate | customer, guest |
| POST | [/shipment/:shipment_id/confirm](doc/shipment_confirm.md) | customer, guest |
| GET | [/shipment/:shipment_id](doc/shipment_show.md) | show all information about shipment |

Notice: for clearity purpose, traceback is shortened in following sample requests/responses.

## Payment API List

| Verb | URL | Note | Roles |
| -- | -- | -- | -- |
| POST | [/payment/:shipment_id/create](doc/payment_create.md) | Create payment (with Paypal) | guest, customer |
| POST | [/payment/execute](doc/payment_execute.md) | Execute payment (with Paypal) | guest, customer |
| GET | [/payment/:shipment_id/list](doc/payment_list.md) | List all payment associated with shipment | guest, customer |
| GET | [/payment/:payment_id](doc/payment_show.md) | Get information details for specific payment | guest, customer |

## User API List

| Verb | URL | Note | Roles |
| -- | -- | -- | -- |
| POST | [/user/register](doc/user_register.md) | Register (if a `guest_id` is given, previous stored data will be connected to newly created account) | guest， unkown |
| POST | [/user/login](doc/user_login.md) | Login and issue a `token` | guest, unkown |
| POST | [/user/logout](doc/user_logout.md) | Logout | customer |
| GET | /user/:user_id | Get user information | customer |

## Address API List

| Verb | URL | Note | Roles |
| -- | -- | -- | -- |
| GET | [/address](doc/address_list) | List addresses for user | customer |
| POST | [/address](doc/address_create) | Create a new address | customer |
| POST | [/address/:address_id](doc/address_edit.md) | Edit address | customer |
| DELETE | [/address/:address_id](doc/address_delete.md) | Delete address | customer |

# Run

## First run on your laptop

1. ```docker-machine create qs```
2. ```cp docker-compose-dev.yml docker-compose.yml```
3. ```eval $(docker-machine env qs)```
4. Use IP you got from ```docker-machine ip qs``` to update /etc/hosts file (add the line on top ```192.168.xxx.xxx  api.qs.dev```)
5. add another line to /etc/hosts ```127.0.0.1 qs.dev```
5. ```docker-compose up```
6. Start a browser to visit http://api.qs.dev. If you see something like "Welcome to QuickSilver API". You are now all set.

## Later run

1. ```eval $(docker-machine env qs)```
2. ```docker-compose up```

Note: if your image has changed, and you need to rebuild ONLY one image, you could do this by ```docker-compose build NAME```
