const API = 'http://localhost:3001';

describe('Backend - API de Tarefas', () => {
  it('GET /tasks retorna lista vazia no início', () => {
    cy.request('GET', `${API}/tasks`).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an('array');
    });
  });

  it('POST /tasks cria uma nova tarefa', () => {
    cy.request('POST', `${API}/tasks`, { title: 'Tarefa de teste' }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.have.property('title', 'Tarefa de teste');
      expect(res.body).to.have.property('id');
    });
  });

  it('POST /tasks sem título retorna erro 400', () => {
    cy.request({
      method: 'POST',
      url: `${API}/tasks`,
      body: { title: '' },
      failOnStatusCode: false
    }).then((res) => {
      expect(res.status).to.eq(400);
    });
  });

  it('DELETE /tasks/:id remove a tarefa', () => {
    cy.request('POST', `${API}/tasks`, { title: 'Para deletar' }).then((res) => {
      const id = res.body.id;
      cy.request('DELETE', `${API}/tasks/${id}`).then((delRes) => {
        expect(delRes.status).to.eq(204);
      });
    });
  });
});