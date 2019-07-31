# classes, funções e métodos necessários para o AUTH0
# funcionar.
# a maioria é de tratamento de erros.

import json
from flask import request, _request_ctx_stack
from functools import wraps
from jose import jwt
from urllib.request import urlopen


# estabelecendo conexão com minha conta, com a api que criei
# e com a criptografia que escolhi usar
AUTH0_DOMAIN = 'doctsteel.auth0.com'
ALGORITHMS = ['RS256']
API_AUDIENCE = 'rhsimulator.ayy.lmao'



# modelo de retorno de erro de autenticação
class AuthError(Exception):
    def __init__(self, error, status_code):
        self.error = error
        self.status_code = status_code

# busca o token de segurança no header da requisição
# NECESSITA ter 'Bearer' antes do token!
def get_token_auth_header():
    auth = request.headers.get('Authorization', None)
    if not auth:
        raise AuthError({
            'code': 'authorization_header_missing',
            'description': 'Authorization header is expected.'
        }, 401)

    parts = auth.split()

    if parts[0].lower() != 'bearer':
        raise AuthError({
            'code': 'invalid_header',
            'description': 'Authorization header must start with "Bearer".'
        }, 401)

    elif len(parts) == 1:
        raise AuthError({
            'code': 'invalid_header',
            'description': 'Token not found.'
        }, 401)

    elif len(parts) > 2:
        raise AuthError({
            'code': 'invalid_header',
            'description': 'Authorization header must be bearer token.'
        }, 401)

    token = parts[1]
    return token

# criando o decorator das roats que criei no main.py que
# se certifica que a pessoa tentando chamá-las está autenticada
def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = get_token_auth_header()
        jsonurl = urlopen(f'https://{AUTH0_DOMAIN}/.well-known/jwks.json')
        jwks = json.loads(jsonurl.read())
        unverified_header = jwt.get_unverified_header(token)
        rsa_key = {}
        for key in jwks['keys']:
            if key['kid'] == unverified_header['kid']:
                rsa_key = {
                    'kty': key['kty'],
                    'kid': key['kid'],
                    'use': key['use'],
                    'n': key['n'],
                    'e': key['e']
                }
        if rsa_key:
            try:
                payload = jwt.decode(
                    token,
                    rsa_key,
                    algorithms=ALGORITHMS,
                    audience=API_AUDIENCE,
                    issuer='https://' + AUTH0_DOMAIN + '/'
                )
            except jwt.ExpiredSignatureError:
                raise AuthError({
                    'code': 'token_expired',
                    'description': 'Token expired.'
                }, 401)

            except jwt.JWTClaimsError:
                raise AuthError({
                    'code': 'invalid_claims',
                    'description': 'Incorrect claims. Please, check the audience and issuer.'
                }, 401)
            except Exception:
                raise AuthError({
                    'code': 'invalid_header',
                    'description': 'Unable to parse authentication token.'
                }, 400)

            _request_ctx_stack.top.current_user = payload
            return f(*args, **kwargs)

        raise AuthError({
            'code': 'invalid_header',
            'description': 'Unable to find the appropriate key.'
        }, 400)

    return decorated

# outro decorator utilizado, que verifica se a conta
# do usuário tem autorização para chamar aquela rota
def requires_role(required_role):
    def decorator(f):
        def wrapper(**args):
            token = get_token_auth_header()
            unverified_claims = jwt.get_unverified_claims(token)

            if unverified_claims.get('http://rhsimulator.ayy.lmao/roles'):
                roles = unverified_claims['http://rhsimulator.ayy.lmao/roles']
                for role in roles:
                    if role == required_role:
                        return f(**args)

            raise AuthError({
                'code': 'insuficient_roles',
                'description': 'You do not have the roles needed to perform this action.'
            }, 401)

        return wrapper

    return decorator
