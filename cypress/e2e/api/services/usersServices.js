import { faker } from '@faker-js/faker';
import * as utils from "../../../support/utils"

class usersServices {

    gerarDadosNovoUsuario() {
        return {
            nome: faker.person.fullName(),
            email: faker.internet.email(),
            senha: faker.internet.password({ length: 8 })
        }
    }

    gerarDadosCamposVazios() {
        return {
            nome: "",
            email: "",
            password: "",
            administrador: ""
        }
    }

    gerarId() {
        let id = utils.gerarId();
        return cy.wrap(id);
    }

    cadastrarNovoUsuario() {
        const usuario = this.gerarDadosNovoUsuario()

        return cy.api({
            method: 'POST',
            url: `${Cypress.env("apiUrl")}/usuarios`,
            body: {
                "nome": usuario.nome,
                "email": usuario.email,
                "password": usuario.senha,
                "administrador": "true"
            }
        })
    }

    validarCadastroNovoUsuario() {
        cy.get('@novoUsuario').then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.message).to.eq("Cadastro realizado com sucesso");
            expect(response.body._id).to.exist
        })
        cy.screenshot();
    }

    buscarTodosOsUsuarios() {
        return cy.api({
            method: 'GET',
            url: `${Cypress.env("apiUrl")}/usuarios`
        })
    }

    validarBuscarTodosOsUsuarios() {
        cy.get('@buscaTodosOsUsuarios').then((response) => {
            const { quantidade, usuarios } = response.body;

            expect(quantidade).to.be.a('number');
            expect(Number.isInteger(quantidade)).to.be.true;
            expect(usuarios).to.be.an('array');
            expect(usuarios.length).to.equal(quantidade);

            if (quantidade > 0) {
                expect(usuarios.length).to.be.greaterThan(0);
            }

            if (usuarios.length > 0) {
                const primeiroUsuario = usuarios[0];
                expect(primeiroUsuario).to.have.all.keys('nome', 'email', 'password', 'administrador', '_id');
            }

        })
        cy.screenshot();
    }

    buscarUsuarioAtravesDoRegistro() {
        return cy.get('@usuario').then((usuario) => {
            const id = usuario.body._id;

            return cy.api({
                method: 'GET',
                url: `${Cypress.env("apiUrl")}/usuarios/${id}`,
                failOnStatusCode: false
            })
        })
    }

    validarBuscarUsuarioAtravesDoRegistro() {
        cy.get('@buscarUsuario').then((response) => {
            const usuario = response.body;

            expect(response.status).to.eq(200);

            expect(usuario).to.have.all.keys('nome', 'email', 'password', 'administrador', '_id');
            expect(usuario.nome).to.be.a('string');
            expect(usuario.email).to.be.a('string');
            expect(usuario.password).to.be.a('string');
            expect(usuario.administrador).to.be.a('string');
            expect(usuario.administrador).to.be.oneOf(['true', 'false']);
            expect(usuario._id).to.be.a('string');
            expect(usuario.email).to.include('@');
        })
        cy.screenshot();
    }

    atualizarDadosUsuario(level) {
        return cy.get('@buscarUsuario').then((usuario) => {
            const id = usuario.body._id
            const usuarioExistente = usuario.body

            if (level == 'email') {
                let novoEmail = this.gerarDadosNovoUsuario().email;
                usuarioExistente.email = novoEmail;
            } else if (level == 'nome') {
                let novoNome = this.gerarDadosNovoUsuario().nome;
                usuarioExistente.nome = novoNome
            } else if (level == 'password') {
                let novoPassword = this.gerarDadosNovoUsuario().senha;
                usuarioExistente.password = novoPassword;
            }
            delete usuarioExistente._id;

            return cy.api({
                method: 'PUT',
                url: `${Cypress.env("apiUrl")}/usuarios/${id}`,
                body: usuarioExistente
            })
        })
    }

    validarAtualizarDadosUsuario() {
        cy.get('@usuarioAtualizado').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq("Registro alterado com sucesso");
        })
        cy.screenshot();
    }

    deletarUsuario() {
        return cy.get('@buscarUsuario').then((usuario) => {
            const id = usuario.body._id;

            cy.api({
                method: 'DELETE',
                url: `${Cypress.env("apiUrl")}/usuarios/${id}`,
                failOnStatusCode: false
            })
        })
    }

    validarUsuarioInexistenteNaBase() {
        cy.get('@buscarUsuario').then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.eq("Usuário não encontrado");
        })
        cy.screenshot();
    }

    buscarUsuarioComRegistroInvalido() {
        return cy.api({
            method: 'GET',
            url: `${Cypress.env("apiUrl")}/usuarios/usuarioInexistente`,
            failOnStatusCode: false
        })
    }

    validarUsuarioComRegristoInvalido() {
        cy.get('@usuarioInvalido').then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.id).to.eq("id deve ter exatamente 16 caracteres alfanuméricos");
        })
        cy.screenshot();
    }

    cadastrarUsuarioCamposVazios() {
        const usuarioCamposVazios = this.gerarDadosCamposVazios();

        return cy.api({
            method: 'POST',
            url: `${Cypress.env("apiUrl")}/usuarios`,
            body: usuarioCamposVazios,
            failOnStatusCode: false
        })
    }

    validarUsuarioCamposVazios() {
        cy.get('@usuarioCamposVazios').then((response) => {
            const body = response.body;
            expect(response.status).to.eq(400);

            expect(body.nome).to.eq("nome não pode ficar em branco");
            expect(body.email).to.eq("email não pode ficar em branco");
            expect(body.password).to.eq("password não pode ficar em branco");
            expect(body.administrador).to.eq("administrador deve ser 'true' ou 'false'");
        })
        cy.screenshot();
    }

    cadastrarUsuarioBodyVazio() {
        const usuarioBodyVazio = utils.gerarBodyVazio();

        return cy.api({
            method: 'POST',
            url: `${Cypress.env("apiUrl")}/usuarios`,
            body: usuarioBodyVazio,
            failOnStatusCode: false
        })
    }

    validarUsuarioBodyVazio() {
        cy.get('@usuarioBodyVazio').then((response) => {
            const body = response.body;
            expect(response.status).to.eq(400);

            expect(body.nome).to.eq("nome é obrigatório");
            expect(body.email).to.eq("email é obrigatório");
            expect(body.password).to.eq("password é obrigatório");
            expect(body.administrador).to.eq("administrador é obrigatório");
        })
        cy.screenshot();
    }

    atualizarUsuarioComRegistro() {
        return cy.get('@buscarUsuario').then((usuario) => {
            const id = usuario.body._id
            const usuarioExistente = usuario.body
            const novoId = utils.gerarId();

            usuarioExistente._id = novoId;

            return cy.api({
                method: 'PUT',
                url: `${Cypress.env("apiUrl")}/usuarios/${id}`,
                body: usuarioExistente,
                failOnStatusCode: false
            })
        })
    }

    validarIdNaoPermitido() {
        cy.get('@usuarioAtualizado').then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body._id).to.eq("_id não é permitido")
        })
        cy.screenshot();
    }

    deletarUsuarioInexistente() {
        return cy.get('@novoId').then((id) => { // agora é só string
            return cy.api({
                method: 'DELETE',
                url: `${Cypress.env("apiUrl")}/usuarios/${id}`,
                failOnStatusCode: false
            });
        });
    }


    validarDeletarUsuarioInexistente() {
        cy.get('@usuarioExcluido').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq("Nenhum registro excluído");
        })
        cy.screenshot();
    }

}
export default usersServices;