import re
def valid_email(email):
    regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
    return bool(re.search(regex, email))

def valid_password(password):
    return len(str(password).strip())>=5