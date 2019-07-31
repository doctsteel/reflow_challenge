from sqlalchemy import Column, String
from marshmallow import Schema, fields
from .entity import Entity, Base



# estabelecendo que a tabela de currículos terão
# tais colunas com tais tipos de dados
class Resume(Entity, Base):
    __tablename__ = 'resumes'

    name = Column(String)
    content = Column(String)
    curriculum = Column(String)

    def __init__(self, name, content, curriculum, created_by):
        Entity.__init__(self, created_by)
        self.name = name
        self.content = content
        self.curriculum = curriculum

# schema final da tabela resumes
class ResumeSchema(Schema):
    id = fields.Number()
    name = fields.Str()
    content = fields.Str()
    curriculum = fields.Str()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    last_updated_by = fields.Str()
