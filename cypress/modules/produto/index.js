class Produto {
  visualizarProduto() {
    cy.get('a[href="/product_details/1"]').click();
  }
  pesquisarProduto() {
    cy.get('#search_product').type('Blue Top');
    cy.get('#submit_search').click();
  }
  adicionarProdutoAoCarrinho() {
    cy.get('a[data-product-id="1"].add-to-cart').first().click();
    cy.get('a[href="/view_cart"]').first().click();
  }

  validarShoppingCart() {
    cy.get('li.active')
      .should('be.visible')
      .and('contain.text', 'Shopping Cart');
  }

  procederCheckout() {
    cy.get('a.btn.btn-default.check_out').should('be.visible').click();
  }
}

export default new Produto();
