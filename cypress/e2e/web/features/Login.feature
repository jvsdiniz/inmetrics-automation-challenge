Feature: WEB | Login

  Scenario Outline: Login com diferentes tipos de usuários
    Given que eu esteja na página de login
    When eu realizo login com o usuário "<tipoUsuario>"
    Then o sistema deve responder conforme o perfil "<tipoUsuario>"

    Examples:
      | tipoUsuario             |
      | standard_user           |
      | locked_out_user         |
      | problem_user            |
      | performance_glitch_user |
      | error_user              |
      | visual_user             |
      | no_user_no_password     |
      | just_user_no_password   |
      | wrong_combination       |

  Scenario: Validar tela de login
    Given que eu esteja na página de login
    When a tela for carregada
    Then todos os elementos devem ser visiveis