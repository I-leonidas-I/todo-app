const API_URL = 'http://localhost:3001';
 
async function loadTasks() {
  const res = await fetch(`${API_URL}/tasks`);
  const tasks = await res.json();
  const list = document.getElementById('taskList');
  list.innerHTML = '';
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);
    li.innerHTML = `
      <span>${task.title}</span>
      <button class="delete-btn" onclick="deleteTask(${task.id})">Remover</button>
    `;
    list.appendChild(li);
  });
}

async function addTask() {
  const input = document.getElementById('taskInput');
  const title = input.value.trim();
  if (!title) return;
  await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  });
  input.value = '';
  loadTasks();
}

async function deleteTask(id) {
  await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
  loadTasks();
}

document.getElementById('addBtn').addEventListener('click', addTask);
document.getElementById('taskInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

loadTasks();
