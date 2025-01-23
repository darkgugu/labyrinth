describe('Labyrinth Navigation', () => {
    it('should allow the player to move right or down in the beggining of the labyrinth', () => {
      // Ignore temporairement l'erreur outOfBoundsMove
      Cypress.on('uncaught:exception', (err, runnable) => {
        if (err.message.includes('outOfBoundsMove')) {
          return false;
        }
      });

      cy.visit('/');
  
      // Attends que la fenêtre de jeu soit visible
      cy.get('.gameWindow', { timeout: 10000 }).should('be.visible');

      // Vérifie les styles initiaux du joueur
      cy.get('#player')
      .should('exist')
      .and('have.css', 'background-color', 'rgb(255, 0, 0)')
      .and('have.css', 'height', '10px')
      .and('have.css', 'width', '10px');

      // Vérifie la position initiale du joueur
      cy.get('#player').invoke('position').then((initialPos) => {
      let moved = false; // Indicateur pour vérifier si un mouvement est possible
  
      // Essaye de bouger vers la droite
      cy.get('body').type('{rightarrow}');
      cy.get('#player').invoke('position').then((posRight) => {
        if (posRight.left > initialPos.left) {
            moved = true; // Confirme que le mouvement à droite est possible
          }
        });
  
      // Essaye de bouger vers le bas
      cy.get('body').type('{downarrow}');
      cy.get('#player').invoke('position').then((posDown) => {
        if (posDown.top > initialPos.top) {
          moved = true; // Confirme que le mouvement vers le bas est possible
        }
  
          // Vérifie que l'une des deux directions a permis le mouvement
          expect(moved).to.be.true; // Si "moved" reste false, le test échoue
        });
      });
    });
  });
  