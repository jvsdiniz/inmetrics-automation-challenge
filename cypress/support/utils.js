import LoginPage from "../e2e/web/pages/loginPage";

const loginPage = new LoginPage();

export function gerarId(tamanho = 16) {
  const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let resultado = "";

  for (let i = 0; i < tamanho; i++) {
    const randomIndex = Math.floor(Math.random() * caracteres.length);
    resultado += caracteres[randomIndex];
  }

  return resultado;
}

export function gerarBodyVazio() {
  return {};
}

export function validarLoginWeb() {
  cy.url().should("include", "/inventory.html");
  loginPage.elements().tituloProducts().should("be.visible");
  loginPage.elements().tituloProducts().should("contain.text", "Products");
}

export function validarImagensIguais() {
  cy.get(".inventory_item_img img")
    .then(($imgs) => {
      const firstSrc = $imgs[0].getAttribute("src");

      $imgs.each((index, img) => {
        expect(img.getAttribute("src")).to.equal(firstSrc);
      });
    });
}

export function validarImagensDiferentes() {
  cy.get(".inventory_item_img img")
    .then(($imgs) => {
      const srcs = $imgs.toArray().map(img => img.getAttribute("src"));
      const uniqueSrcs = new Set(srcs);

      expect(uniqueSrcs.size).to.equal(srcs.length);
    });
}