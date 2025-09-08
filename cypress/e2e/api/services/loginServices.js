import * as utils from "../../../support/utils"

class loginServices {

    gerarEmailInvalido() {
        return {
            "email": "teste",
            "password": "teste"
        }
    }

    realizarLogin() {
        return cy.get('@buscarUsuario').then((usuario) => {
            const email = usuario.body.email;
            const senha = usuario.body.password;

            let body = {
                "email": email,
                "password": senha
            };

            return cy.api({
                method: 'POST',
                url: `${Cypress.env("apiUrl")}/login`,
                body: body
            })
        })
    }

    validarLoginComSucesso() {
        cy.get('@login').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property("message", "Login realizado com sucesso");
            expect(response.body).to.have.property("authorization");
        })
        cy.screenshot();
    }

    gerarDadosCamposVazios() {
        return {
            email: "",
            password: ""
        }
    }

    loginUsuarioCamposVazios() {
        const usuarioCamposVazios = this.gerarDadosCamposVazios();

        return cy.api({
            method: 'POST',
            url: `${Cypress.env("apiUrl")}/login`,
            body: usuarioCamposVazios,
            failOnStatusCode: false
        })
    }

    validarUsuarioCamposVazios() {
        cy.get('@usuarioCamposVazios').then((response) => {
            const body = response.body;
            expect(response.status).to.eq(400);

            expect(body.email).to.eq("email não pode ficar em branco");
            expect(body.password).to.eq("password não pode ficar em branco");
        })
        cy.screenshot();
    }

    loginUsuarioBodyVazio() {
        const usuarioBodyVazio = utils.gerarBodyVazio();

        return cy.api({
            method: 'POST',
            url: `${Cypress.env("apiUrl")}/login`,
            body: usuarioBodyVazio,
            failOnStatusCode: false
        })
    }

    validarUsuarioBodyVazio() {
        cy.get('@usuarioBodyVazio').then((response) => {
            const body = response.body;
            expect(response.status).to.eq(400);

            expect(body.email).to.eq("email é obrigatório");
            expect(body.password).to.eq("password é obrigatório");
        })
        cy.screenshot();
    }

    loginEmailInvalido() {
        const bodyEmailInvalido = this.gerarEmailInvalido();

        return cy.api({
            method: 'POST',
            url: `${Cypress.env("apiUrl")}/usuarios`,
            body: bodyEmailInvalido,
            failOnStatusCode: false
        })
    }

    validarEmailInvalido(){
        cy.get('@usuarioEmailInvalido').then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.email).to.eq("email deve ser um email válido");
        })
        cy.screenshot();
    }

}
export default loginServices;
