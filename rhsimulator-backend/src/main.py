# Importando os modelos das tabelas usadas pelo ORM
from .entities.entity import Session, engine, Base
from .entities.resume import Resume, ResumeSchema
from flask import Flask, jsonify, request
from flask_cors import CORS
import sys
from .auth import AuthError, requires_auth, requires_role


# inicializando flask e o ORM
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

Base.metadata.create_all(engine)



# GET da página principal que mostra todos o currículos
# Retorna um JSON contendo um array de currículos.
@app.route('/resumes')
def get_resumes():
    # pegar do database
    session = Session()
    curriculums = session.query(Resume).all()

    # transformar para objetos serializaveis de JSON
    schema = ResumeSchema(many=True)
    resumes = schema.dump(curriculums)

    # serializar
    session.close()
    return jsonify(resumes.data)

# POST de adição de currículo ao banco de dados
@app.route('/resumes', methods=['POST'])
@requires_auth
def add_resume():
    # montar objeto curriculo
    posted_resume = ResumeSchema(only=('name', 'content', 'curriculum')).load(request.get_json())
    cv = Resume(**posted_resume.data, created_by="HTTP POST REQUEST")

    # mandar pro db o curriculo montado
    session = Session()
    session.add(cv)
    session.commit()

    # retornar curriculo criado
    new_cv = ResumeSchema().dump(cv).data
    session.close()
    return jsonify(new_cv), 201

# DELETE de um currículo em específico
@app.route('/resumes/<resumeId>', methods=['DELETE'])
@requires_role('admin')
def delete_exam(resumeId):
    session = Session()
    resume = session.query(Resume).filter_by(id=resumeId).first()
    session.delete(resume)
    session.commit()
    session.close()
    return '', 201

# manipulação de erros:
# a grande maioria são erros de autenticação.
@app.errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response

# GET de visualização de um currículo em específico.
# Retorna um json contendo:
# {'name': string, 'content': string, 'curriculum': string}
@app.route('/detalhes/<resumeId>', methods=['GET'])
@requires_auth
def get_specific_resume(resumeId):
    session = Session()
    resume = session.query(Resume).filter_by(id=resumeId).first()
    schema = ResumeSchema()
    jsoncv = schema.dump(resume)
    session.close()
    return jsonify(jsoncv.data), 201

@app.route('/detalhes/<resumeId>', methods=['POST'])
@requires_auth
def update_specific_resume(resumeId):
    # mandar pro db o curriculo montado
    session = Session()
    cv = session.query(Resume).filter_by(id=resumeId).first()
    posted_resume = ResumeSchema(only=('name', 'content', 'curriculum')).load(request.get_json())
    print(posted_resume.data)
    cv.name = posted_resume.data['name']

    cv.content = posted_resume.data['content']
    cv.curriculum = posted_resume.data['curriculum']
    session.commit()

    # retornar curriculo editado
    new_cv = ResumeSchema().dump(cv).data
    session.close()
    return jsonify(new_cv), 201


