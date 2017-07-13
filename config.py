#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os, sys, datetime

DB_NAME = 'quicksilver'

class Config(object):
    DEBUG = False
    TESTING = False
    EASYPOST_API_KEY = 'z3AbHO0tgo64AFkapUlJ5A'

    REMEMBER_COOKIE_DURATION = datetime.timedelta(hours=3)

    # Google OAuth
    GOOGLE_CLIENT_ID = '988981253248-na81nhb4ui27j6mlij3644bbsfbfps0l.apps.googleusercontent.com'
    GOOGLE_CLIENT_SECRET = 'U4UVeiCRZTlI7DIfSnNG1xHK'
    REDIRECT_URI = '/ui/google_get_token'

    # Email
    GMAIL_ACCOUNT = 'stack360test@gmail.com'

    # Facebook OAuth
    FACEBOOK_APP_ID='120754155152551'
    FACEBOOK_APP_SECRET='1e9424340f2aacfa90893f1627c36357'

    SECRET_KEY = os.environ.get('SECRET_KEY') or 'fjdljLJDL08_80jflKzcznv*c'

    PAYPAL_MODE = 'sandbox'
    PAYPAL_CLIENT_ID = 'Af8o7d3Ui5pqrAhgJCPq2LXCxviksZo0Fz79CpinPs5azTw7myMCu4nq2mj7IxCS68_tib9bym56M4c7'
    PAYPAL_CLIENT_SECRET = 'EFNrl2p5RG7i4P7Cxt-TCrh613tZpO9xUtT0luIYZLO4mu6Oit1M99Cc4vEjVBTHAx6MJfR_0jqb7_MI'

    INSURANCE_RATIO = 0.01

    # MongoDB
    MONGODB_SETTINGS = {
        'DB': DB_NAME,
        'HOST': os.environ.get('DB_HOST') or 'api.qs.dev',
        'PORT': int(os.environ.get('DB_PORT')) if os.environ.get('DB_PORT') else 28017
    }

    @staticmethod
    def init_app(app):
        pass

class DevConfig(Config):
    DEBUG = True
    SEND_FILE_MAX_AGE_DEFAULT = 0

class ProdConfig(Config):
    DEBUG = os.environ.get('DEBUG', 'false').lower() == 'true'
    MONGODB_SETTINGS = {
        'DB': os.environ.get('DB_NAME'),
        'HOST': os.environ.get('DB_HOST'),
        'PORT': 27017
    }

class TestConfig(Config):
    TESTING = True
    DEBUG = True
    MONGODB_SETTINGS = {
        'DB': 'test',
        'HOST': '127.0.0.1',
        'PORT': 27017
    }
    WTF_CSRF_ENABLED = False

config = {
    'dev': DevConfig,
    'prod': ProdConfig,
    'test': TestConfig,
    'default': DevConfig,
}

current_config = config[os.getenv('WORK_MODE') or 'default']
