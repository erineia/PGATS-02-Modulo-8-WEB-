// modalPage.js
class ModalPage {
  get newTransactionLink() {
    return 'a.button.new';
  }

  get modalOverlay() {
    return '.modal-overlay';
  }

  get modal() {
    return '.modal';
  }

  get cancelButton() {
    return 'a.button.cancel';
  }

  openModal() {
    cy.get(this.newTransactionLink).click();
  }

  isModalOpen() {
    cy.get(this.modalOverlay).should('be.visible');
    cy.get(this.modal).should('be.visible');
  }

  closeModal() {
    cy.get(this.cancelButton).click();
    cy.get(this.modalOverlay).should('not.be.visible');
  }
}

export default ModalPage;
