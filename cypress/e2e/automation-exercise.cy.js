/// <reference types="cypress" />

import usersData from '../fixtures/users.json';
import { getRandomNumber, getRandomEmail } from '../support/helpers';
import { faker, fakerPT_BR } from '@faker-js/faker';

describe('Automarion Exercise', () => {
  beforeEach(() => {
    cy.viewport('iphone-xr');
    cy.goToLoginPage();
  });
  it('Exemplos de Logs', () => {
    cy.log(`STEP 1 :: PGATS AUTOMACAO WEB CY LOG`);
    cy.log(`STEP 1 :: PGATS AUTOMACAO WEB CY LOG`);

    cy.log(`getRandomNumber: ${getRandomNumber()}`);
    cy.log(`getRandomEmail: ${getRandomEmail()}`);

    cy.log(`Nome do usuário: ${usersData.validUser.name}`);
    cy.log(`Email do usuário: ${usersData.validUser.email}`);

    console.log(`PGATS AUTOMACAO WEB CY LOG`);
  });

  it.only('Cadastrar um usuário', () => {
    cy.get('[data-qa="signup-name"]').type('QA Tester');
    cy.get('[data-qa="signup-email"]').type(
      `qa-tester-${getRandomNumber()}@test.com`,
    );
    cy.contains('button', 'Signup').click();

    cy.get('#id_gender1').check();
    cy.get('input#password').type('12345', { log: false });

    //combobox ou selects

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

    // Aguardar o campo state ser habilitado e digitar
    cy.get('[data-qa="state"]').should('not.be.disabled');
    cy.get('[data-qa="state"]').type(faker.location.state());
    cy.get('[data-qa="city"]').type(faker.location.city());
    cy.get('[data-qa="zipcode"]').type(faker.location.zipCode());
    cy.get('[data-qa="mobile_number"]').type('61999999999');

    cy.contains('button', 'Create Account').click();

    cy.url().should('includes', 'account_created');
    cy.contains('b', 'Account Created!');
  });

  it('Login de usuários com email e senha corretos', () => {
    cy.login('validUser');

    cy.get('.fa.fa-user').parent().should('contain', 'QA Tester');
  });

  it('Login e senha invalidos', () => {
    cy.login('invalidUser');

    cy.get('.login-form > form > p').should(
      'contain',
      'Your email or password is incorrect!',
    );
  });
  it('Logout de Usuário', () => {
    cy.login('validUser');

    cy.get('.fa.fa-user').parent().should('contain', 'QA Tester');
    cy.get('a[href="/logout"]').should('be.visible').click();

    cy.url().should('contain', 'login');
  });

  it('Cadastrar usuário com email existente no sistema', () => {
    cy.get('[data-qa="signup-name"]').type('QA Tester');
    cy.get('[data-qa="signup-email"]').type(`qa-tester-1759530219181@test.com`);

    cy.contains('button', 'Signup').click();
    cy.get('.signup-form > form > p').should(
      'contain',
      'Email Address already exist!',
    );
  });
});
