Feature: WEB | Checkout

  Scenario: Compra com sucesso
    Given que eu esteja logado com o usuário standard
    When um pedido for feito com sucesso
    Then devemos ver a mensagem de sucesso

  Scenario: Adicionar e remover item do carrinho
    Given que eu esteja logado com o usuário standard
    When um item for adicionado e retirado
    Then o carrinho deve estar vazio

  Scenario: Comprar mais de um item com sucesso
    Given que eu esteja logado com o usuário standard
    When um pedido com mais de um item for feito com sucesso
    Then devemos ver a mensagem de sucesso

  Scenario: Falha | Não preencher campos obrigatórios 
    Given que eu esteja logado com o usuário standard
    When eu preencho os campos "<firstName>", "<lastName>", "<postalCode>"
    Then deve aparecer a mensagem de erro "<mensagemErro>"

    Examples:
      | firstName | lastName  | postalCode | mensagemErro                   |
      |           | Sobrenome |      12345 | Error: First Name is required  |
      | Nome      |           |      12345 | Error: Last Name is required   |
      | Nome      | Sobrenome |            | Error: Postal Code is required |
