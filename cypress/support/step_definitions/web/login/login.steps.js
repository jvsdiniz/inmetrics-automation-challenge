import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../../../e2e/web/pages/loginPage";
import users from "../../../jsons/users.json"
import * as utils from "../../../utils"

const loginPage = new LoginPage();

Given("que eu esteja na página de login", () => {
    loginPage.visit()
})

When("eu realizo login com o usuário {string}", (tipoUsuario) => {
    const user = users[tipoUsuario]
    start = Date.now();
    if (tipoUsuario === "no_user_no_password") {
        loginPage.elements().botaoLogin().click();
    } else if (tipoUsuario === "just_user_no_password") {
        loginPage.elements().campoUsername().type("standard_user");
        loginPage.elements().botaoLogin().click();
    } else {
        loginPage.login(user.username, user.password);
    }
})

Then("o sistema deve responder conforme o perfil {string}", (tipoUsuario) => {
    if (tipoUsuario === "standard_user") {
        utils.validarLoginWeb();
        utils.validarImagensDiferentes();
    }
    else if (tipoUsuario === "locked_out_user") {
        loginPage.elements().mensagemErro().should("contain", "this user has been locked out")
    } else if (tipoUsuario === "problem_user") {
        utils.validarImagensIguais();
    } else if (tipoUsuario === "no_user_no_password") {
        loginPage.elements().mensagemErro().should("contain", "Username is required");
    } else if (tipoUsuario === "just_user_no_password") {
        loginPage.elements().mensagemErro().should("contain", "Password is required");
    } else if (tipoUsuario === "wrong_combination"){
        loginPage.elements().mensagemErro().should("contain", "Username and password do not match any user in this service");
    } else if (tipoUsuario === "performance_glitch_user") {
        cy.url().should("include", "/inventory.html").then(() => {
            const end = Date.now();
            const duracao = end - start;
            expect(duracao).to.be.greaterThan(5000).and.lessThan(7000);
        })
    }
})

When("a tela for carregada", () => {
    cy.url().should('eq', 'https://www.saucedemo.com/');
})

Then("todos os elementos devem ser visiveis", () => {
    loginPage.validarTodosOsElementosDaPaginaDeLogin();
})