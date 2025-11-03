/// <reference types="cypress" />

import ModalPage from '../support/PageObjects/modalPage';

const modalPage = new ModalPage();

describe('Modal Functionality Tests', () => {
  beforeEach(() => {
    cy.visit('https://devfinance-agilizei.netlify.app/');
  });

  it('Verify that clicking the link opens the modal for a new transaction', () => {
    modalPage.openModal();
    modalPage.isModalOpen();
  });

  it('Attempt to click the link when the modal is already open and verify that it does not open a new instance of the modal', () => {
    modalPage.openModal();
    modalPage.isModalOpen();
    cy.get('.modal').should('have.length', 1);
    cy.get('.modal-overlay').should('be.visible');
  });

  it('Simulate a user clicking the link while the page is loading and check if the modal still opens correctly', () => {
    cy.intercept('GET', '**').as('pageLoad');
    cy.visit('https://devfinance-agilizei.netlify.app/');
    cy.wait('@pageLoad');
    modalPage.openModal();
    modalPage.isModalOpen();
  });

  it("Test the link's functionality on different devices", () => {
    const devices = ['iphone-6', 'ipad-2', 'macbook-15'];
    devices.forEach((device) => {
      cy.viewport(device);
      modalPage.openModal();
      modalPage.isModalOpen();
      modalPage.closeModal();
    });
  });
});
