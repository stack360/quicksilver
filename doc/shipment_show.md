## Show Shipment

`GET` `/shipment/:shipment_id`

#### Request Body: Empty

#### Response: 200 OK

```json
{
  "from_address": {
    "city": "san jose",
    "country": "US",
    "id": "594860f373a0b316400f647a",
    "name": "simon",
    "phone": "4083339999",
    "state": "CA",
    "street1": "3970 the woods dr, apt 910",
    "street2": "",
    "zip": "95136"
  },
  "height": 3.4,
  "id": "59481a3f73a0b3532debfefd",
  "is_draft": true,
  "length": 3.4,
  "to_address": {
    "city": "san diego",
    "country": "US",
    "id": "5948611273a0b316400f647b",
    "name": "jessy",
    "phone": "4083339999",
    "state": "CA",
    "street1": "3970 the woods dr",
    "zip": "95136"
  },
  "weight": 5,
  "width": 2.3
}
```
