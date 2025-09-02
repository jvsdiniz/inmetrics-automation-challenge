import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import UsersServices from "../../e2e/api/services/usersServices";

const usersServices = new UsersServices();

Given("que eu queira buscar a lista contendo todos os usuários", () => {
    return true;
});

When("realizo a busca através da chamada GET", () => {
    usersServices.buscarTodosOsUsuarios().as('buscaTodosOsUsuarios');
});

Then("deve ser retornado a lista com todos os usuarios", () => {
    usersServices.validarBuscarTodosOsUsuarios();
});

Given("que eu queira cadastrar um novo usuario no sistema", () => {
    usersServices.gerarDadosNovoUsuario();
});

When("realizo uma chamada POST para endpoint", () => {
    usersServices.cadastrarNovoUsuario().as('novoUsuario');
});

Then("o usuario deve ser cadsatrado com sucesso", () => {
    usersServices.validarCadastroNovoUsuario();
});

Given("que eu tenha um usuario cadastrado", () => {
    usersServices.cadastrarNovoUsuario().as('usuario');
});

When("eu realizo a busca através do registro dele", () => {
    usersServices.buscarUsuarioAtravesDoRegistro().as('buscarUsuario');
});

Then("deve ser retornado o usuario cadastrado", () => {
    usersServices.validarBuscarUsuarioAtravesDoRegistro();
});

When("eu atualizar o {string} do usuario", (level) => {
    usersServices.buscarUsuarioAtravesDoRegistro().as('buscarUsuario');
    usersServices.atualizarDadosUsuario(level).as('usuarioAtualizado');
});

Then("deve ser retornado o usuario", () => {
    usersServices.validarAtualizarDadosUsuario();
});

When("eu deletar o usuario existente", () => {
    usersServices.buscarUsuarioAtravesDoRegistro().as('buscarUsuario');
    usersServices.deletarUsuario();
});

Then("não deve ser possivel achar o usuario realizando busca", () => {
    usersServices.buscarUsuarioAtravesDoRegistro().as('buscarUsuario');
    usersServices.validarUsuarioInexistenteNaBase();
});