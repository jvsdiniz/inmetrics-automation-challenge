Feature: API | Login

Scenario: Sucesso | Realizacao de login
    Given que eu tenha um usuario cadastrado
    When utilizo o email e senha dele
    Then o login deve ser feito com sucesso

Scenario: Falha | Realizar login com campos em branco
    Given que eu tenha os campos preenchidos como vazio
    When realizo a tentativa de login
    Then deve ser retornado que os campos nao podem ficar em branco

Scenario: Falha | Realizar login com o body vazio
    Given o body esteja vazio
    When realizo o login com o body vazio
    Then deve ser retornado a mensagem que os campos sao obrigatorios

Scenario: Falha | Realizar login com email invalido
    Given que eu tenho um email invalido
    When eu realizo o login com o email invalido
    Then deve ser retornado a mensagem que o email deve ser um email valido