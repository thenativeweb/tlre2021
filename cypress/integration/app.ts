describe('App-Tests', (): void => {
  it('loads the page.', async (): Promise<void> => {
    cy.visit('/');
    
    cy.contains('Halloween Party Planner');
  });
  
  it('lest the user add a new party.', async (): Promise<void> => {
    cy.visit('/');
    
    cy.findByText('Neue Party hinzufügen').click();
    cy.findByLabelText('Name des Gastgebers').type('Hostname');
    cy.findByLabelText('Avatar auswählen').select('Avatar 1');
    cy.findByLabelText('Partybeschreibung').type('My Party Description');
    cy.findByText('Party speichern').click();
    
    cy.contains('Hostnames Halloween-Party');
    cy.contains('My Party Description');
  });
});

// Avoid TypeScript Module Error
export {}
