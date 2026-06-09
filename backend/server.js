const express = require('express'); 
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Banco de dados em memória (array de tarefas)
let tasks = [];
let nextId = 1;

// GET /tasks — lista todas as tarefas
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST /tasks — adiciona uma nova tarefa
app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'Título é obrigatório' });
  }
  const task = { id: nextId++, title: title.trim(), done: false };
  tasks.push(task);
  res.status(201).json(task);
});

// DELETE /tasks/:id — remove uma tarefa pelo id
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Tarefa não encontrada' });
  }
  tasks.splice(index, 1);
  res.status(204).send();
});

// Exporta para os testes conseguirem usar
const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});

module.exports = { app, server };
