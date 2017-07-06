from flask_principal import RoleNeed, Permission
from collections import namedtuple
from functools import partial

# Permissions
valid_customer = Permission(RoleNeed('valid_customer'))
valid_customer.description = "Customer's permissions"

known_guest= Permission(RoleNeed('known_guest'))
known_guest.description = "Guest's permissions"

ShipmentNeed = namedtuple('shipment', ['method', 'value'])
ManageShipmentNeed = partial(ShipmentNeed, 'manage')

class ManageShipmentPermission(Permission):
  def __init__(self, shipment_id):
    _id = str(shipment_id)
    need = ManageShipmentNeed(_id)
    super(ManageShipmentPermission, self).__init__(need)

AddressNeed = namedtuple('address', ['method', 'value'])
ManageAddressNeed = partial(AddressNeed, 'manage')

class ManageAddressPermission(Permission):
  def __init__(self, address_id):
    _id = str(address_id)
    need = ManageAddressNeed(_id)
    super(ManageAddressPermission, self).__init__(need)
