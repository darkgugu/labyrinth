describe('Login and Signup Buttons', () => {
    it('should show login and signup forms', () => {
      cy.visit('/');
  
      // Clique sur "Connexion"
      cy.get('button').contains('Connexion').click();
      cy.get('form').should('be.visible').and('contain', 'Email').and('contain', 'Mot de passe');
  
      // Si l'overlay bloque toujours le clic, utiliser force
      cy.get('button').contains('Inscription').click({ force: true });
  
      // Vérifie que le formulaire d'inscription s'affiche
      cy.get('form').should('be.visible').and('contain', 'S\'inscrire');
    });
  });
  