import { faker } from '@faker-js/faker';

class Cadastro {
  preencherFormularioCadastroCompleto() {
    cy.get('#id_gender1').check();
    cy.get('input#password').type('12345', { log: false });
    cy.get('[data-qa="days"]').select('24');
    cy.get('[data-qa="months"]').select('September');
    cy.get('[data-qa="years"]').select('1984');
    cy.get('input[type="checkbox"]#newsletter').check();
    cy.get('input[type="checkbox"]#optin').check();
    cy.get('[data-qa="first_name"]').type(faker.person.firstName());
    cy.get('[data-qa="last_name"]').type(faker.person.lastName());
    cy.get('[data-qa="company"]').type(`PGATS ${faker.company.name()}`);
    cy.get('[data-qa="address"]').type(faker.location.streetAddress());
    cy.get('[data-qa="address2"]').type(faker.location.street());
    cy.get('[data-qa="state"]').should('not.be.disabled');
    cy.get('[data-qa="state"]').type(faker.location.state());
    cy.get('[data-qa="city"]').type(faker.location.city());
    cy.get('[data-qa="zipcode"]').type(faker.location.zipCode());
    cy.get('[data-qa="mobile_number"]').type('61999999999');
  }
}

export default new Cadastro();
