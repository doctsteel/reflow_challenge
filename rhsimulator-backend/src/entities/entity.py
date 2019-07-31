import os
from datetime import datetime
from sqlalchemy import create_engine, Column, String, Integer, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


# inicializando a conexão do ORM com o banco de dados local que criei
db_url = 'ec2-54-243-193-59.compute-1.amazonaws.com:5432'
db_name = 'd67k1pakj5ib5l'
db_user = 'kgvvqgplxckwtd'
db_password = 'e384c787ac96bae85b192db69d8ae369b68d4c04fab73bc2b28d5b7efd445eee'
engine = create_engine(f'postgresql://{db_user}:{db_password}@{db_url}/{db_name}')
Session = sessionmaker(bind=engine)

Base = declarative_base()

# toda que eu criar, vai usar essas colunas no mínimo.
class Entity:
    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    last_updated_by = Column(String)

    def __init__(self, created_by):
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        self.last_updated_by = created_by
