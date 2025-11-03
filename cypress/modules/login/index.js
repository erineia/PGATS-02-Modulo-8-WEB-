import { faker } from '@faker-js/faker';
import { getRandomEmail } from '../../support/helpers';

class Login {
  preencherFormularioPreCadastro() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const fullName = `${firstName} ${lastName}`;
    //const email = `qa-tester-${faker.number.bigInt()}@test.com`;

    cy.get('[data-qa="signup-name"]').type(fullName);
    cy.get('[data-qa="signup-email"]').type(getRandomEmail());

    // Armazenar o nome completo como alias para usar na validação
    cy.wrap(fullName).as('nomeUsuarioGerado');

    cy.contains('button', 'Signup').click();
  }
  preencherFormularioDeLogin(user, pass) {
    cy.get('[data-qa="login-email"]').type(pass);
    cy.get('[data-qa="login-password"]').type(user);

    cy.get('[data-qa="login-button"]').click();
  }
}

export default new Login();
