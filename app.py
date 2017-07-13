import os, sys
app_path = os.path.join(os.path.dirname(os.path.realpath(__file__)))
sys.path.append(app_path)
import traceback
from bson import ObjectId
from datetime import datetime

from flask import g, Flask, redirect, request, url_for, render_template

from flask_login import LoginManager
from flask_principal import Principal, identity_loaded, RoleNeed, ItemNeed
from mongoengine.errors import ValidationError
from mongoengine import DoesNotExist

from config import *

# controllers
from api.user_api import user_api
from api.shipment_api import shipment_api
from api.address_api import address_api
from api.payment_api import payment_api
from api.api_exceptions import *

# models
from models.models import db, Token
from roles import ManageShipmentNeed, ManageAddressNeed

import qs_utils

login_manager = LoginManager()
login_manager.session_protection = 'basic'
login_manager.login_view = 'api.login'

principals = Principal()

@login_manager.user_loader
def load_user(id):
    try:
        user = User.objects.get(id=id)
    except User.DoesNotExist:
        raise Unauthorized("Please login to continue")
    return user

@login_manager.request_loader
def load_user_from_request(request):
    token_text = request.headers.get('X-Auth-Token')
    try:
        token = Token.objects.get(text=token_text)
        if token and datetime.now() > token.expire_at:
            # if token is found but expired
            # raise exception for unauthorized access for API ONLY
            token.delete()
            raise TokenExpire("Please provide valid token for API usage")

        user = token.user
        return user
    except Token.DoesNotExist:
        raise BadRequest("wrong token")

def create_app():
    app = Flask(__name__)
    app.config.from_object(current_config)
    current_config.init_app(app)

    db.init_app(app)
    login_manager.init_app(app)
    principals.init_app(app)
    return app

app = create_app()

app.register_blueprint(user_api, url_prefix='/api/v1/user')
app.register_blueprint(shipment_api, url_prefix='/api/v1/shipment')
app.register_blueprint(address_api, url_prefix='/api/v1/address')
app.register_blueprint(payment_api, url_prefix='/api/v1/payment')

@app.context_processor
def inject_dict_for_all_templates():
    active_module = request.path.split('/')[1] if '/' in request.path else ''
    return {'_active_module':active_module}

@identity_loaded.connect_via(app)
def on_identity_loaded(sender, identity):
    print 'IDENTITY CHANGED TO : ', identity.id
    if len(identity.id.split(',')) >= 2:
        _role = identity.id.split(',')[0]
        _id = identity.id.split(',')[1]

        # provides privillege for role
        if _role == 'known_guest':
            identity.provides.add(RoleNeed('known_guest'))

        if _role == 'valid_customer':
            identity.provides.add(RoleNeed('valid_customer'))
            identity.provides.add(RoleNeed('known_guest'))

        # provides privillege for manage single table
        if g.__contains__('shipments'):
            for shipment in g.shipments:
                identity.provides.add(ManageShipmentNeed(str(shipment.id)))
        if g.__contains__('addresses'):
            for address in g.addresses:
                identity.provides.add(ManageAddressNeed(str(address.id)))

        if _role == 'admin':
            identity.provides.add(RoleNeed('admin'))

@app.errorhandler(403)
def handle_403(error):
    response = {
        "error":"make sure either X-Auth-Token or X-Auth-Guest-Id is in your request",
        "traceback": "None",
        "code": "UNKOWN_TO_SERVER"
    }
    return qs_utils.make_json_response(403, response)

@app.errorhandler(Exception)
def handle_exception(error):
    print '-'*80
    print "[EXCEPTION CAUGHT]: ", type(error).__name__
    print traceback.format_exc()
    print '-'*80
    error_type = type(error).__name__

    status_code = HTTPCode.INTERNAL_SERVER_ERROR
    response = {
        "error":error_type,
        "traceback": traceback.format_exc(),
        "code": qs_utils.camel_2_snake_case(type(error).__name__).upper()
    }

    # self-defined errors
    if isinstance(error, HTTPException):
        status_code = error.status_code
        response['error'] = error.message

    # mongoengine validation error
    if isinstance(error, ValidationError):
        status_code = HTTPCode.BAD_REQUEST
        response['error'] = 'incorrect input parameters'

    # mongoengine query error
    if isinstance(error, DoesNotExist):
        status_code = HTTPCode.NOT_FOUND
        class_name = error.message.split(' ')[0]
        response['error'] = class_name.lower()+' does not exist'

    # easypost address validation error
    if isinstance(error, AddressValidationError):
        status_code = HTTPCode.BAD_REQUEST
        response['error'] = error.message
        response['validations'] = error.errors_array

    # general error
    if isinstance(error, GeneralError):
        response['error'] = error.message
        response['traceback'] = error.traceback

    return qs_utils.make_json_response(status_code, response)

@app.route('/')
def index():
    return "Welcome to QuickSilver API"

if __name__=="__main__":
    app.run(threaded=True)
