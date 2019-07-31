# RH Simulator!

Olá!
Esse é meu projeto da etapa de seleção para a vaga de dev full-stack da Reflow.
Você consegue encontrar esse microsservidor hostado no heroku na seguinte url:
https://rhsimulator-backend.herokuapp.com/

# Estrutura do projeto
Decidi dividir a estrutura do projeto em dois repositórios diferentes: o back e o front-end.
O back-end usa **Flask, Auth0,  SQLAlchemy e PostgreSQL**.
O front-end usa **Angular**.
## Back-end

### Arquivos

    src/
	    main.py
	    auth.py
	    entities/
		    entities.py
		    resume.py
		

O main.py contém todas as rotas do back-end e também a inicialização do servidor.
Auth.py consta o tratamento de erros e a criação de decorators para acoplar autenticação de usuários e gestão de tipos de tais, tipo requerir que o usuário seja um admin para acesso a algumas rotas. (Pra fins da minha prova de conceito, só. Todo mundo que se logar já é um admin!)
Entities.py inicializa a conexão com o banco de dados(que na verdade só consta uma tabela) e estabelece algumas colunas padrões que toda tabela criada deve ter: coluna de ID, quem modificou, quando criou e quando modificou.
Resume.py estabelece as colunas extras que o programa irá usar: name, content e curriculum, todos eles strings. 
	    

### Rotas do back-end

 **/resumes**
GET- Disponível para todos usuários, essa rota fornece todos os currículos dentro do database no seguinte formato JSON:

    [{'name': string,
    'content': string,
     'curriculum': string,
      'id': int,
      'created_at': datetime,
      'updated_at': datetime,
      'last_updated_by': string}, {...}, {...}]
   
 POST- Disponível somente para usuários logados, é a rota de envio de um novo currículo ao banco de dados. Uma requisição de exemplo ficaria da seguinte forma:
 

    Header: application/json,
	    Authorization Bearer {token de segurança}
    Body: {'name':string, 'content': string, 'curriculum': string}

DELETE- Disponível somente para usuários da classe admin. É uma requisição simples, direto da url: resumes/{id do currículo a ser deletado}.

**/detalhes/{id do currículo}**
GET- Disponível para somente para usuários logados, retorna um JSON com o currículo inserido na url.
O retorno:

    {'name': string,
    'content':string,
    'curriculum': string}

POST- Também só para usuários logados. Atualiza a entrada do currículo no ID da URL, no mesmo formato que a requisição de novo currículo.
 

## Desafios encontrados

- Bugs
	- Ao menos nos testes manuais, nenhum encontrado no back-end!
- Dificuldades
	- Implementar a API de autenticação de usuário do Auth0 foi um saco. Bibliotecas do python estavam desatualizadas, e fui obrigado a dar uma lida no código do python-jose-cryptodome pra descobrir como resolver um problema de instalação.
	- Fazer o deploy no heroku. O Procfile é bem inconsistente em relação a executar um servidor django para um servidor flask.
	- Limitações de programar em um notebook relativamente velho.
- O que falta
	- Testes automatizados.
	- Implementar continuous deployment no heroku.
	- Criar colunas mais específicas na tabela e implementar de acordo no programa (coisa tipo 'cargo', 'formação', 'idade' e 'cidade'.
	- Armazenar profiles de cada usuário e lembrar preferências.



