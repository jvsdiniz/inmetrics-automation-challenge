import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import * as utils from "../../utils";
import CheckoutPage from "../../../e2e/web/pages/checkoutPage";
import loginPage from "../../../e2e/web/pages/loginPage";

const checkoutPage = new CheckoutPage()

Given("que eu esteja logado com o usuário standard", () => {
    utils.loginWebStandard();
    utils.validarLoginWeb();
});

When("um pedido for feito com sucesso", () => {
    checkoutPage.realizarPedidoComSucesso();
});

Then("devemos ver a mensagem de sucesso", () => {
    cy.url().should("include", "/checkout-complete.html");
    cy.contains("Checkout: Complete!")
    cy.contains("Thank you for your order!")
});


When("um item for adicionado e retirado", () => {
    checkoutPage.adicionarRetirarProdutoCarrinho()
});

Then("o carrinho deve estar vazio", () => {
    checkoutPage.elements().itemNoCarrinho().should('not.exist');
});

When("um pedido com mais de um item for feito com sucesso", () => {
    checkoutPage.realizarPedidoComMaisDeUmItemComSucesso();
});

When("eu preencho os campos {string}, {string}, {string}", (firstName, lastName, postalCode) => {
    checkoutPage.preencherMensagensDeErroCamposObrigatorios(firstName, lastName, postalCode)
});

Then("deve aparecer a mensagem de erro {string}", (mensagemErro) => {
  checkoutPage.validarMensagensDeErroCamposObrigatorios(mensagemErro)
});





