Feature: Usuário

Scenario: Sucesso | Buscar todos os usuarios
    Given que eu queira buscar a lista contendo todos os usuários
    When realizo a busca através da chamada GET
    Then deve ser retornado a lista com todos os usuarios 

Scenario: Sucesso | Cadastro de um novo usuario 
    Given que eu queira cadastrar um novo usuario no sistema
    When realizo uma chamada POST para endpoint
    Then o usuario deve ser cadsatrado com sucesso

Scenario: Sucesso | Buscar usuário por id
    Given que eu tenha um usuario cadastrado
    When eu realizo a busca através do registro dele
    Then deve ser retornado o usuario cadastrado

Scenario: Sucesso | Atualizar informacoes de um usuario 
    Given que eu tenha um usuario cadastrado
    When eu atualizar o "email" do usuario
    Then deve ser retornado o usuario  

Scenario: Sucesso | Excluir usuario
    Given que eu tenha um usuario cadastrado
    When eu deletar o usuario existente
    Then não deve ser possivel achar o usuario realizando busca

Scenario: Falha | Buscar um usuário sem um id válido
    Given que eu quero realizar uma busca com um id invalido
    When realizo a chamada com o id invalido
    Then deve ser retornado a mensagem de erro id deve ter exatamente 16 caracteres alfanuméricos

Scenario: Falha | Cadastrar usuário com campos vazios
    Given que eu quero realizar um cadastro com os campos vazios
    When realizo a chamada com todos os campos vazios
    Then deve ser retornado a mensagem que os campos nao podem ficar em branco

Scenario: Falha | Cadastrar usuário com o body vazio
    Given que eu quero realizar um cadastro com o body vazio
    When realizo a chamada sem enviar o body
    Then deve ser retornado que os campos são obrigatórios

Scenario: Falha | Atualizar id de um usuario
    Given que eu tenha um usuario cadastrado
    When eu atualizar o id do usuario   
    Then nao deve ser permitido atualizar o id

Scenario: Falha | Excluir usuario inexistente
    Given que eu tenha um registro invalido
    When eu deletar o usuario 
    Then nenhum registro deve ser excluído