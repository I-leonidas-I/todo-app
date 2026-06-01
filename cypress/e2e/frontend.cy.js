describe('Frontend - Interface de Tarefas', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5500'); // ou a porta do seu servidor estático
  });

  it('Exibe o título da página', () => {
    cy.get('h1').should('contain', 'Lista de Tarefas');
  });

  it('Adiciona uma tarefa ao clicar no botão', () => {
    cy.get('#taskInput').type('Minha nova tarefa');
    cy.get('#addBtn').click();
    cy.get('#taskList').should('contain', 'Minha nova tarefa');
  });

  it('Adiciona uma tarefa ao pressionar Enter', () => {
    cy.get('#taskInput').type('Tarefa via Enter{enter}');
    cy.get('#taskList').should('contain', 'Tarefa via Enter');
  });

  it('Remove uma tarefa ao clicar em Remover', () => {
    cy.get('#taskInput').type('Tarefa para remover');
    cy.get('#addBtn').click();
    cy.get('#taskList').contains('Tarefa para remover')
      .parent()
      .find('.delete-btn')
      .click();
    cy.get('#taskList').should('not.contain', 'Tarefa para remover');
  });
});