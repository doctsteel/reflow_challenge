# RH Simulator!

Olá!
Esse é meu projeto da etapa de seleção para a vaga de dev full-stack da Reflow.
Você consegue encontrar o front-end desse projeto hostado no próprio github:
https://doctsteel.github.io/rhsimulator/

# Estrutura do projeto
Decidi dividir a estrutura do projeto em dois repositórios diferentes: o back e o front-end.
O back-end usa **Flask, Auth0,  SQLAlchemy e PostgreSQL**.
O front-end usa **Angular e Bootstrap**.
## Front-end
		
O front-end em angular usou 5 componentes:
- 'app.component.ts'
- '*resume-form.component.ts*'
- 'resumes.component.ts'
- 'visualizer.component.ts'
- 'callbck.component.ts'
	
O app.component estabelece a página central do programa, resumes.component exibe a listagem de currículos, resumes-form.component segura a lógica da busca dinâmica da página (acredito que foi o mais difícil de implementar!), callbck.component consiste na compatibilidade com o Auth0 pra logar cada usuário ao site e o visualizer é a exibição e edição de currículos existentes.


## Desafios encontrados

- Bugs
	- Problema na redireção do callback feito pelo auth0. As vezes a tela não é atualizada com a exibição dos currículos e da busca...
	- Nenhuma exibição de erros de autenticação: falta dizer ao usuário quando o token expira ou quando o usuário não tem a autoridade pra realizar alguma ação.
- Dificuldades
	- Implementar a API de autenticação de usuário do Auth0 foi um saco, ainda mais no angular.
	- Limitações de programar em um notebook relativamente velho.
- O que falta
	- Testes automatizados.
	- Páginas de profile.
	- Opções de buscas mais específicas
	- Uma edição de currículo mais completa
	- Upload de documentos! Dado mais tempo, eu queria implementar alguma forma de verificar um PDF de currículo e captar dados diretamente dele!
	- 


