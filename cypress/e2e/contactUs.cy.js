import usersData from '../fixtures/users.json';

describe('Formulario Contact us', () => {
  beforeEach(() => {
    cy.viewport('iphone-xr');
    cy.fixture('urls').then((urls) => {
      cy.visit(urls.baseUrl);
    });
  });

  it('Formulário contact us', () => {
    cy.get('a[href*=contact]').should('be.visible').click();
    cy.url().should('include', 'contact');
    cy.get('[data-qa="name"]')
      .should('be.visible')
      .type(usersData.validUser.name);
    cy.get('[data-qa="email"]').type(usersData.validUser.email);
    cy.get('[data-qa="subject"]').type(usersData.contactUs.subject);
    cy.get('[data-qa="message"]').type(usersData.contactUs.message);

    cy.fixture('users.json').as('arquivo');
    cy.get('input[type=file]').selectFile('@arquivo');
    cy.get('[data-qa="submit-button"]').click();

    cy.get('.status').should('be.visible');
    cy.get('.status').should(
      'have.text',
      'Success! Your details have been submitted successfully.',
    );
  });
});
