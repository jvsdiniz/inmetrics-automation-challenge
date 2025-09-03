import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import UsersServices from "../../../e2e/api/services/usersServices";
import LoginServices from "../../../e2e/api/services/loginServices";

const usersServices = new UsersServices();
const loginServices = new LoginServices();

When("utilizo o email e senha dele", () => {
    usersServices.buscarUsuarioAtravesDoRegistro().as('buscarUsuario');
    loginServices.realizarLogin().as('login');
});

Then("o login deve ser feito com sucesso", () => {
    loginServices.validarLoginComSucesso();
}); 

Given("que eu tenha os campos preenchidos como vazio", () => {
  loginServices.gerarDadosCamposVazios()
});

When("realizo a tentativa de login", () => {
  loginServices.loginUsuarioCamposVazios().as('usuarioCamposVazios');
});

Then("deve ser retornado que os campos nao podem ficar em branco", () => {
  loginServices.validarUsuarioCamposVazios();
});

When("realizo o login com o body vazio", () => {
  loginServices.loginUsuarioBodyVazio().as('usuarioBodyVazio');
});

Then("deve ser retornado a mensagem que os campos sao obrigatorios", () => {
  loginServices.validarUsuarioBodyVazio();
});

Given("que eu tenho um email invalido", () => {
  loginServices.gerarEmailInvalido();
});

When("eu realizo o login com o email invalido", () => {
  loginServices.loginEmailInvalido().as('usuarioEmailInvalido');
});

Then("deve ser retornado a mensagem que o email deve ser um email valido", () => {
  loginServices.validarEmailInvalido()
});