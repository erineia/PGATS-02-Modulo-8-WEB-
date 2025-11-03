class Menu {
  navegarParaLogin() {
    cy.get('a[href="/login"]').click();
  }
  efetuarLogout() {
    cy.get('a[href="/logout"]').should('be.visible').click();
  }
  acessarProdutos() {
    cy.get('a[href="/products"]').should('be.visible').click();
  }
  acessarHome() {
    cy.get('a[href="/"]').contains('Home').should('be.visible').click();
  }
}

export default new Menu();
