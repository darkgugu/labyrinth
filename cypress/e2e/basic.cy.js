describe('Labyrinth App - Structure', () => {
    it('should display the labyrinth, commands, game rules and the login buttons', () => {
      cy.visit('/');
  
      // Vérifie l'affichage du labyrinthe
      cy.get('.gameWindow').should('be.visible');

      // Vérifie l'affichage du labyrinthe
      cy.get('.Commands').should('be.visible');

      // Vérifie l'affichage des boutons
      cy.get('.spanbutton').should('be.visible');
  
      // Vérifie l'affichage des règles
      cy.contains('Règles du jeu').should('be.visible');
    });
  });
  