/// <reference types="cypress" />

import usersData from '../fixtures/users.json';
import cadastro from '../modules/cadastro';
import home from '../modules/home';
import login from '../modules/login';
import menu from '../modules/menu';
import produto from '../modules/produto';

describe('Automarion Exercise', () => {
  let userCredentials = {};

  before(() => {
    // Create a user first that we can use for login tests
    cy.visit('https://automationexercise.com/');
    cy.navegarParaLogin();

    // Generate unique credentials
    const uniqueId = Date.now();
    userCredentials = {
      email: `test-user-${uniqueId}@example.com`,
      password: '12345',
      name: 'Test User',
    };

    // Create the account
    cy.get('[data-qa="signup-name"]').type(userCredentials.name);
    cy.get('[data-qa="signup-email"]').type(userCredentials.email);
    cy.contains('button', 'Signup').click();

    // Fill out the complete registration form
    cadastro.preencherFormularioCadastroCompleto();
    cy.contains('button', 'Create Account').click();
    cy.url().should('includes', 'account_created');
    cy.contains('b', 'Account Created!');

    // Log out to prepare for tests
    cy.get('[data-qa="continue-button"]').click();
    cy.get('a[href="/logout"]').click();
  });

  beforeEach(() => {
    //cy.viewport('iphone-xr');
    cy.visit('https://automationexercise.com/');
    cy.navegarParaLogin();
  });

  it('Cadastrar um usuário', () => {
    login.preencherFormularioPreCadastro();
    cadastro.preencherFormularioCadastroCompleto();
    //Asserts
    cy.contains('button', 'Create Account').click();
    cy.url().should('includes', 'account_created');
    cy.contains('b', 'Account Created!');
  });

  it('Login de usuários com email e senha corretos', () => {
    login.preencherFormularioDeLogin(
      userCredentials.email,
      userCredentials.password,
    );
    //Asserts
    cy.get('i.fa-user', { timeout: 10000 })
      .should('be.visible')
      .parent()
      .should('contain', userCredentials.name);
    cy.get('a[href="/logout"]', { timeout: 10000 }).should('be.visible');
    cy.get(':nth-child(10) > a', { timeout: 10000 })
      .should('be.visible')
      .and('have.text', `Logged in as ${userCredentials.name}`);
  });

  it('Login de Usuário com e-mail e senha incorretos', () => {
    login.preencherFormularioDeLogin(userCredentials.email, 'wrong-password');
    cy.get('.login-form > form > p', { timeout: 10000 }).should(
      'contain',
      'Your email or password is',
    );
  });
  it('Logout de Usuário', () => {
    login.preencherFormularioDeLogin(
      userCredentials.email,
      userCredentials.password,
    );
    menu.efetuarLogout();

    cy.url().should('contain', 'login');
    cy.contains('Login to your account');
  });

  it('Cadastrar usuário com email existente no sistema', () => {
    cy.get('[data-qa="signup-name"]').type('QA Tester');
    cy.get('[data-qa="signup-email"]').type(userCredentials.email); // Use the email we created

    cy.contains('button', 'Signup').click();
    cy.get('.signup-form > form > p', { timeout: 10000 }).should(
      'contain',
      'Email Address already exist!',
    );
  });

  it('Acessar Produtos', () => {
    menu.acessarProdutos();
    cy.contains('All Products').should('be.visible');
    cy.get('.fa.fa-plus-square').parent().should('contain', 'View Product');

    produto.visualizarProduto();

    cy.contains('Blue Top').should('be.visible');
    cy.contains('p', 'Category: Women > Tops').should('be.visible');
    cy.contains('b', 'Availability:').should('be.visible');
    cy.contains('In Stock').should('be.visible');
    cy.get('span')
      .contains('Rs. 500')
      .should('be.visible')
      .and('contain.text', 'Rs. 500');
    cy.contains('b', 'Condition:').should('be.visible');
    cy.contains('New').should('be.visible');
    cy.contains('b', 'Brand:').should('be.visible');
    cy.contains('Polo').should('be.visible');
  });
  it('Pesquisar Produtos', () => {
    menu.acessarProdutos();
    cy.contains('All Products').should('be.visible');
    produto.pesquisarProduto();

    cy.contains('Searched Products').should('be.visible');
    cy.contains('Blue Top').should('be.visible');
  });
  it('Verificar Assinatura', () => {
    menu.acessarHome();
    cy.scrollTo('bottom');

    cy.contains('Subscription').should('be.visible');
    home.enviarEmailAssinatura();

    cy.get('.alert-success.alert')
      .should('be.visible')
      .and('contain', 'You have been successfully subscribed!');
  });
  it('Adicionar Produtos ao carrinho', () => {
    login.preencherFormularioPreCadastro();
    cadastro.preencherFormularioCadastroCompleto();

    cy.contains('button', 'Create Account').click();
    cy.url().should('includes', 'account_created');
    cy.contains('b', 'Account Created!');

    cy.get('[data-qa="continue-button"]').click();

    cy.get('@nomeUsuarioGerado').then((nomeGerado) => {
      cy.get(':nth-child(10) > a')
        .should('be.visible')
        .invoke('text')
        .then((text) => {
          expect(text.trim()).to.equal(`Logged in as ${nomeGerado}`);
        });
    });

    produto.adicionarProdutoAoCarrinho();
    produto.validarShoppingCart();
    produto.procederCheckout();
  });
});
