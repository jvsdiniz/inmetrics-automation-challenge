import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import UsersServices from "../../../e2e/api/services/usersServices"

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

Given("que eu quero realizar uma busca com um id invalido", () => {
    return true;
});

When("realizo a chamada com o id invalido", () => {
    usersServices.buscarUsuarioComRegistroInvalido().as('usuarioInvalido')
});

Then("deve ser retornado a mensagem de erro id deve ter exatamente 16 caracteres alfanuméricos", () => {
    usersServices.validarUsuarioComRegristoInvalido();
});

Given("que eu quero realizar um cadastro com os campos vazios", () => {
    usersServices.gerarDadosCamposVazios();
});

When("realizo a chamada com todos os campos vazios", () => {
    usersServices.cadastrarUsuarioCamposVazios().as('usuarioCamposVazios');
});

Then("deve ser retornado a mensagem que os campos nao podem ficar em branco", () => {
    usersServices.validarUsuarioCamposVazios();
});

Given("que eu quero realizar um cadastro com o body vazio", () => {
    usersServices.gerarBodyVazio();
});

When("realizo a chamada sem enviar o body", () => {
    usersServices.cadastrarUsuarioBodyVazio().as('usuarioBodyVazio');
});

Then("deve ser retornado que os campos são obrigatórios", () => {
    usersServices.validarUsuarioBodyVazio();
});

When("eu atualizar o id do usuario", () => {
    usersServices.buscarUsuarioAtravesDoRegistro().as('buscarUsuario');
    usersServices.atualizarUsuarioComRegistro().as('usuarioAtualizado');
});

Then("nao deve ser permitido atualizar o id", () => {
    usersServices.validarIdNaoPermitido();
});

Given("que eu tenha um registro invalido", () => {
    usersServices.gerarId().as('novoId');
});

When("eu deletar o usuario", () => {
    usersServices.deletarUsuarioInexistente().as('usuarioExcluido');
});

Then("nenhum registro deve ser excluído", () => {
    usersServices.validarDeletarUsuarioInexistente();
});