class loginPage {

    elements() {
        return {
            campoUsername: () => cy.get('[data-test="username"]'),
            campoPassword: () => cy.get('[data-test="password"]'),
            botaoLogin: () => cy.get('[data-test="login-button"]'),
            mensagemErro: () => cy.get('[data-test="error"]'),
            containerLogin: () => cy.get('[data-test="login-container"]'),
            containerUsersPasswords: () => cy.get('.login_credentials_wrap-inner'),
            tituloTelaLogin: () => cy.get('.login_logo'),
            tituloProducts: () => cy.get('[data-test="secondary-header"]')
        }
    }

    visit() {
        cy.visit(`${Cypress.env("apiWeb")}`)
    }

    login(username, password) {
        this.elements().campoUsername().type(username)
        this.elements().campoPassword().type(password)
        this.elements().botaoLogin().click()
    }

    validarTodosOsElementosDaPaginaDeLogin() {
        const { campoUsername, campoPassword, botaoLogin, mensagemErro, containerLogin, containerUsersPasswords, tituloTelaLogin } = this.elements();

        [   campoUsername,
            campoPassword,
            botaoLogin,
            containerLogin,
            containerUsersPasswords,
            tituloTelaLogin
        ].forEach(elementos => {
            elementos().should('be.visible');
        });

        mensagemErro().should('not.exist');
    }

}
export default loginPage;