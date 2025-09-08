class checkoutPage {

    elements() {
        return {
            containerProduto: () => cy.get('[data-test="inventory-item-description"]'),
            iconeCarrinho: () => cy.get('[data-test="shopping-cart-link"]'),
            itemNoCarrinho: () => cy.get('[data-test="inventory-item"]'),
            botaoCheckout: () => cy.get('[data-test="checkout"]'),
            firstName: () => cy.get('[data-test="firstName"]'),
            lastName: () => cy.get('[data-test="lastName"]'),
            postalCode: () => cy.get('[data-test="postalCode"]'),
            mensagemErro: () => cy.get('[data-test="error"]'),
            botaoContinue: () => cy.get('[data-test="continue"]'),
            botaoFinish: () => cy.get('[data-test="finish"]'),
            quantidadeCarrinho: () => cy.get('[data-test="shopping-cart-badge"]')
        }
    }

    realizarPedidoComSucesso() {
        this.elements().containerProduto().find('button').contains('Add to cart').click();
        this.elements().iconeCarrinho().click();
        this.elements().itemNoCarrinho().should('be.visible');
        this.elements().botaoCheckout().click();
        cy.url().should("include", "/checkout-step-one.html");
        this.elements().firstName().type("João Diniz");
        this.elements().lastName().type("Inmetrics");
        this.elements().postalCode().type("12345-555");
        this.elements().botaoContinue().click();
        cy.url().should("include", "/checkout-step-two.html");
        this.elements().botaoFinish().click();
    }

    adicionarRetirarProdutoCarrinho() {
        this.elements().containerProduto().find('button').contains('Add to cart').click();
        this.elements().quantidadeCarrinho().should('have.text', '1');
        this.elements().containerProduto().find('button').contains('Remove').click();
        this.elements().quantidadeCarrinho().should('not.exist');
        this.elements().iconeCarrinho().click();
    }

    realizarPedidoComMaisDeUmItemComSucesso() {
        cy.get('.inventory_item').each(($el, index) => {
            if (index < 3) {
                cy.wrap($el).find('button').contains('Add to cart').click();
            }
        });
        this.elements().iconeCarrinho().click();
        this.elements().itemNoCarrinho().should('be.visible');
        this.elements().botaoCheckout().click();
        cy.url().should("include", "/checkout-step-one.html");
        this.elements().firstName().type("João Diniz");
        this.elements().lastName().type("Inmetrics");
        this.elements().postalCode().type("12345-555");
        this.elements().botaoContinue().click();
        cy.url().should("include", "/checkout-step-two.html");
        this.elements().botaoFinish().click();
    }

    preencherMensagensDeErroCamposObrigatorios(firstName, lastName, postalCode) {
        this.elements().containerProduto().find('button').contains('Add to cart').click();
        this.elements().iconeCarrinho().click();
        this.elements().itemNoCarrinho().should('be.visible');
        this.elements().botaoCheckout().click();
        cy.url().should("include", "/checkout-step-one.html");
        if (firstName) {
            this.elements().firstName().type(firstName);
        }
        if (lastName) {
            this.elements().lastName().type(lastName);
        }
        if (postalCode) {
            this.elements().postalCode().type(postalCode);
        }
        this.elements().botaoContinue().click();
    }

    validarMensagensDeErroCamposObrigatorios(mensagemErro){
        this.elements().mensagemErro().should("be.visible").and("contain", mensagemErro);
    }

}
export default checkoutPage;