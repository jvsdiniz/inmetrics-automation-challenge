Feature: Usuário

Scenario: Buscar todos os usuarios
    Given que eu queira buscar a lista contendo todos os usuários
    When realizo a busca através da chamada GET
    Then deve ser retornado a lista com todos os usuarios 

Scenario: Cadastro de um novo usuario com sucesso
    Given que eu queira cadastrar um novo usuario no sistema
    When realizo uma chamada POST para endpoint
    Then o usuario deve ser cadsatrado com sucesso

Scenario: Buscar usuário por id
    Given que eu tenha um usuario cadastrado
    When eu realizo a busca através do registro dele
    Then deve ser retornado o usuario cadastrado

Scenario: Atualizar informacoes de um usuario com sucesso
    Given que eu tenha um usuario cadastrado
    When eu atualizar o "email" do usuario
    Then deve ser retornado o usuario  

Scenario: Excluir usuario
    Given que eu tenha um usuario cadastrado
    When eu deletar o usuario existente
    Then não deve ser possivel achar o usuario realizando busca
