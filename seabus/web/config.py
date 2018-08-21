import os
import seabus

class Config(object):
    DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI = 'sqlite://'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class Test(Config):
    TESTING = True

class Dev(Config):
    DEBUG=True
    seabus_project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir, os.path.pardir))
    SQLALCHEMY_DATABASE_URI = 'sqlite:///{}/db_seabus.db'.format(seabus_project_root)
    LISTENER_HOST = '127.0.0.1'
    LISTENER_PORT =5858
    LISTENER_UPDATE_URL = 'http://127.0.0.1/update'

class Prod(Config):
    seabus_project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir, os.path.pardir))
    SQLALCHEMY_DATABASE_URI = 'sqlite:///{}/db_seabus.db'.format(seabus_project_root)
    LISTENER_HOST = '127.0.0.1'
    LISTENER_PORT = 3001
    LISTENER_UPDATE_URL = 'http://127.0.0.1/update'
