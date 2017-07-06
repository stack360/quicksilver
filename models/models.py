import os
import binascii
from datetime import datetime, date
from bson import DBRef, ObjectId
import simplejson as json
from copy import deepcopy

from flask_login import UserMixin
from flask_mongoengine import MongoEngine
from werkzeug.security import generate_password_hash, check_password_hash

from quicksilver_api.config import current_config

import crypts

db = MongoEngine()

ROLES = (('customer', 'customer'),
            ('admin', 'admin'))

class BaseModel(object):
    # params that should be ignored during update
    __ignore_params__=['id']
    __as_json_ignored__ = []

    def update_by_dict(self, args_dict):
        return self.update(**args_dict)

    def update(self, **kwargs):
        def field_value(field, value):

            if field.__class__ in (db.ListField, db.SortedListField):
                return [
                    field_value(field.field, item)
                    for item in value
                ]
            elif field.__class__ in (
                db.EmbeddedDocumentField,
                db.GenericEmbeddedDocumentField,
                db.ReferenceField
            ):
                return DBRef(field.document_type._get_collection_name(), ObjectId(value))
            elif field.__class__ in ( db.StringField, ):
                return str(value)
            else:
                return value

        for k, v in kwargs.iteritems():
            if k not in self.__ignore_params__ and k in self._fields.keys():
                setattr(self, k, field_value(self._fields[k], v))

    def as_json(self, includes=[], *args, **kwargs):
        jsonObj = json.loads(self.to_json(*args, **kwargs))
        if '_id' in jsonObj:
            jsonObj['id'] = jsonObj.get('_id').get('$oid')
            del jsonObj['_id']
        for k in self._fields.keys():
            if type(self._fields[k]) == db.ReferenceField and self[k]:
                jsonObj[k] = self[k].as_json()

            if type(self._fields[k]) == db.DateTimeField and self[k]:
                jsonObj[k] = date.strftime(self[k], '%Y-%m-%d %H:%M:%S')

        # delete ignored fields
        for k in self.__as_json_ignored__:
            if jsonObj.has_key(k):
                del jsonObj[k]

        # delete everything not in includes
        if includes and len(includes) > 0:
            for k in jsonObj.keys():
                if k not in includes:
                    del jsonObj[k]

        return jsonObj

    def to_dict(self, *args, **kwargs):
        return json.loads(self.as_json(*args, **kwargs))



class User(UserMixin, BaseModel, db.Document):
    username = db.StringField(max_length=255, required=True)
    email = db.EmailField(max_length=255)
    role = db.StringField(max_length=32, default='customer', choices=ROLES)

    password_hash = db.StringField(required=True)

    last_login = db.DateTimeField(default=datetime.now)
    gravatar_url = db.URLField(required=False)
    avatar_color = db.StringField(max_length=255)
    bio = db.StringField(max_length=255)

    # @classmethod
    # def pre_save(cls, sender, user, **kwargs):
        # user.full_name = user.first_name[0].upper() + user.first_name[1:] + ' ' + user.last_name[0].upper() + user.last_name[1:]

    __as_json_ignored__ = ['password_hash']

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_simple_dict(self):
        user_dict = {}
        user_dict['username'] = self.username
        # user_dict['initial'] = self.first_name[:1].upper() + self.last_name[:1].upper()
        user_dict['gravatar_url'] = self.gravatar_url
        user_dict['avatar_color'] = self.avatar_color
        return user_dict

    def to_dict(self):
        user_dict = {}
        user_dict['id'] = str(self.id)
        user_dict['username'] = self.username
        user_dict['email'] = self.email
        user_dict['create_time'] = self.create_time.strftime('%m/%d/%y %H:%M')
        user_dict['last_login'] = self.last_login.strftime('%m/%d/%y %H:%M')
        user_dict['role'] = self.role
        user_dict['avatar_color'] = self.avatar_color
        user_dict['gravatar_url'] = self.gravatar_url

        return user_dict

class Guest(BaseModel, db.Document):
    pass

class Address(BaseModel, db.Document):
    name = db.StringField(max_length=255, required=True)
    street1 = db.StringField(max_length=512, required=True)
    street2 = db.StringField(max_length=512)
    city = db.StringField(max_length=255, required=True)
    state = db.StringField(max_length=255, required=True)
    zip= db.StringField(max_length=255, required=True)
    country = db.StringField(max_length=255, required=True)
    phone = db.StringField(max_length=255, required=True)
    user = db.ReferenceField(User, required=False)
    guest = db.ReferenceField(Guest, required=False)

    __ignore_params__ = ['id', 'user']
    __as_json_ignored__ = ['user']

class Token(BaseModel, db.Document):
    text = db.StringField(max_length=255)
    expire_at = db.DateTimeField(default=datetime.now, required=True)
    user = db.ReferenceField(User)

    __as_json_ignored__ = ['user', 'id']

    def __init__(self, *args, **values):
        super(Token, self).__init__(*args, **values)
        self.text = crypts.gen_token_text()
        self.expire_at = datetime.now() + current_config.REMEMBER_COOKIE_DURATION

    def as_json(self, includes=[], *args, **kwargs):
        jObj = super(Token, self).as_json(includes=includes, *args, **kwargs)
        jObj['token'] = jObj['text']
        del jObj['text']
        return jObj

class Rate(BaseModel, db.EmbeddedDocument):
    id = db.DecimalField(required=True, unique=True)

    service = db.StringField(max_length=255)
    carrier = db.StringField(max_length=255)

    list_rate = db.StringField(max_length=255)
    list_currency = db.StringField(max_length=255)
    retail_rate = db.StringField(max_length=255)
    retail_currency = db.StringField(max_length=255)

    rate = db.StringField(max_length=255)
    currency = db.StringField(max_length=255)

    delivery_days = db.DecimalField()
    est_delivery_days = db.DecimalField()
    delivery_date_guaranteed = db.BooleanField(default=False)

    __ignore_params__ = ['id']

    def is_same_with(self, obj):
        try:
            result_array = [
                self.service == obj.get('service'),
                self.carrier == obj.get('carrier'),
                self.list_rate == obj.get('list_rate'),
                self.list_currency == obj.get('list_currency'),
                self.rate == obj.get('rate'),
                self.currency == obj.get('currency'),
                self.retail_rate == obj.get('retail_rate'),
                self.retail_currency == obj.get('retail_currency'),
                self.delivery_days == obj.get('delivery_days'),
                self.est_delivery_days == obj.get('est_delivery_days'),
                self.delivery_date_guaranteed == obj.get('delivery_date_guaranteed')
            ]
            return all(result_array)
        except:
            import traceback
            traceback.print_exc()
            return False

    def save(self, *args, **kwargs):
        # self.id = str(ObjectId())
        return super(Rate, self).save(*args, **kwargs)

class Shipment(BaseModel, db.Document):
    user = db.ReferenceField(User, required=False)
    guest = db.ReferenceField(Guest, required=False)
    rates = db.EmbeddedDocumentListField(Rate)
    picked_rate_id = db.DecimalField(default=0)

    #easypost
    ep_shipment_id = db.StringField(max_length=512)
    tracking_code = db.StringField(max_length=512)
    carrier = db.StringField(max_length=256)
    label_png_url = db.StringField(max_length=1024)

    from_address = db.ReferenceField(Address)
    to_address = db.ReferenceField(Address)
    width = db.DecimalField()
    length = db.DecimalField()
    height = db.DecimalField()
    weight = db.DecimalField()

    insured = db.BooleanField(default=False)
    insured_value = db.DecimalField(default=0)

    insurance_premium = db.DecimalField(default=0)
    tax = db.DecimalField(default=0)
    platform_fee = db.DecimalField(default=0.04)


    is_draft = db.BooleanField(default=True)

    __as_json_ignored__ = ['user', 'guest']

    def as_json(self, includes=[], *args, **kwargs):
        jsonObj =  super(Shipment, self).as_json(includes=includes, *args, **kwargs)
        rate = self.get_picked_rate()
        if rate:
            print rate.rate
            print self.insurance_premium
            print self.platform_fee
            float_subtotal = float(self.insurance_premium) + float(rate.rate) + float(self.platform_fee)
            float_total = float_subtotal + float(self.tax)
            jsonObj['subtotal'] = '%.2f' % float_subtotal
            jsonObj['total'] = '%.2f' % float_total
        return jsonObj

    def get_picked_rate(self):
        if (len(self.rates)> 0) and (self.picked_rate_id>0):
            for rate in self.rates:
                if rate.id == self.picked_rate_id:
                    return rate
        return None

    def finalize_address(self):
        from_address = deepcopy(self.from_address)
        from_address.id = None

        to_address = deepcopy(self.to_address)
        to_address.id = None
        if self.user:
            from_address.user = self.user
            to_address.user = self.user
        if self.guest:
            from_address.guest = self.guest
            to_address.guest = self.guest

    def is_valid(self):
        return (
            bool(self.from_address)
            & bool(self.to_address)
            & (self.picked_rate_id > 0)
            & (len(self.rates) > 0)
            & bool(self.width)
            & bool(self.height)
            & bool(self.length)
            & bool(self.weight)
        )

class Payment(BaseModel, db.Document):
    shipment = db.ReferenceField(Shipment)
    user = db.ReferenceField(User, required=False)
    guest = db.ReferenceField(Guest, required=False)

    total = db.DecimalField(default=0.0)
    currency = db.StringField(default='USD')

    channel = db.StringField(default='Paypal')

    pp_payment_id = db.StringField(max_length=512)
    pp_payer_id = db.StringField(max_length=512)

    success = db.BooleanField(default=False)

# transfer ownership from guest to user
def transfer_ownership(guest, user):
    for klass in [Address, Shipment, Payment]:
        klass.objects(guest=guest).update(unset__guest=1, user=user)


