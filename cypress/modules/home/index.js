import { getRandomEmail } from '../../support/helpers';

class Home {
  enviarEmailAssinatura() {
    cy.get('#susbscribe_email').type(getRandomEmail());
    cy.get('#subscribe').click();
  }

  clicarBotaoSubscribe() {
    cy.get('#subscribe').should('be.visible').click();
  }
}

export default new Home();
