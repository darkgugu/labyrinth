describe('Labyrinth App', () => {
    it('should load the home page', () => {
      cy.visit('/');
      cy.contains('Labyrinth').should('be.visible');
    });
  });
  