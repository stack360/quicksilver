import crypt
import string
from random import choice
from datetime import datetime

def _mksalt():
  _saltchars = string.ascii_letters + string.digits

  """generate salt."""
  salt = ''
  salt += ''.join(choice(_saltchars) for _ in range(15))
  return salt

def _encrypt(value):
  """Get encrypted value."""
  salt = _mksalt()
  return crypt.crypt(value, salt)

def gen_token_text():
  return 'T_'+_encrypt(str('seed'))
