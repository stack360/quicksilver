import re
import simplejson as json
import crypt
import smtplib

from flask import request, make_response

from api import api_exceptions

def get_request_data():
    if request.data:
        try:
            data = json.loads(request.data)
        except Exception:
            raise api_exceptions.BadRequest(
                'request data is not json formatted: %s' % request.data
            )
        if not isinstance(data, dict):
            raise api_exceptions.BadRequest(
                'request data is not json formatted dict: %s' % request.data
            )
        return data
    else:
        return {}


def make_json_response(status_code, data):
    """Wrap json format to the reponse object."""
    result = json.dumps(data)
    resp = make_response(result, status_code)
    resp.headers['Content-type'] = 'application/json'

    return resp

def shifttimedelta(td):
    return td.days, td.seconds//3600, (td.seconds//60)%60

def camel_2_snake_case(name):
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()
