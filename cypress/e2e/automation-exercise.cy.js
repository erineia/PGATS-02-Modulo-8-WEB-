/// <reference types="cypress" />

import usersData from '../fixtures/users.json';
import cadastro from '../modules/cadastro';
import login from '../modules/login';
import menu from '../modules/menu';

describe('Automarion Exercise', () => {
  beforeEach(() => {
    cy.viewport('iphone-xr');
    cy.visit('https://automationexercise.com/');
    cy.navegarParaLogin();
  });

  it.only('Cadastrar um usuário', () => {
    login.preencherFormularioPreCadastro();
    cadastro.preencherFormularioCadastroCompleto();
    //Asserts
    cy.contains('button', 'Create Account').click();
    cy.url().should('includes', 'account_created');
    cy.contains('b', 'Account Created!');
  });

  it('Login de usuários com email e senha corretos', () => {
    login.preencherFormularioDeLogin(
      usersData.validUser.email,
      usersData.validUser.password,
    );
    //Asserts
    cy.get('i.fa-user').parent().should('contain', usersData.validUser.name);
    cy.get('a[href="/logout"]').should('be.visible');
    cy.get(':nth-child(10) > a')
      .should('be.visible')
      .and('have.text', `Logged in as ${usersData.validUser.name}`);
  });

  it('Login de Usuário com e-mail e senha incorretos', () => {
    login.preencherFormularioDeLogin(usersData.validUser.email, '54321');
    cy.get('.login-form > form > p').should(
      'contain',
      'Your email or password is',
    );
  });
  it('Logout de Usuário', () => {
    login.preencherFormularioDeLogin(
      usersData.validUser.email,
      usersData.validUser.password,
    );
    menu.efetuarLogout();

    cy.url().should('contain', 'login');
    cy.contains('Login to your account');
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
