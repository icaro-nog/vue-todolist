import express from "express";
import cors from "cors";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

// Configuração do banco
const adapter = new JSONFile("server/db.json");
const db = new Low(adapter, { todos: [] });

const app = express();
app.use(cors());
app.use(express.json());

// Ler dados
app.get("/todos", async (req, res) => {
  await db.read();
  res.json(db.data.todos);
});

app.get("/todos/:id", async (req, res) => {
  await db.read();

  const id = parseInt(req.params.id); // pega o id da URL e converte p/ número
  const todo = db.data.todos.find(t => t.id === id);

  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ error: "Todo não encontrado" });
  }
});

app.put("/todos/:id", async (req, res) => {
  await db.read();

  const id = parseInt(req.params.id); // ID vindo da URL
  const index = db.data.todos.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Todo não encontrado" });
  }

  // atualiza apenas os campos enviados no body
  db.data.todos[index].title = req.body.todo.title;
  db.data.todos[index].completed = req.body.todo.completed;

  await db.write(); // salva no arquivo

  res.json(db.data.todos[index]);
});

// deletar tarefa
app.delete("/todos/:id", async (req, res) => {
  await db.read();

  const idTodo = parseInt(req.params.id); // ID vindo da URL
  const index = db.data.todos.findIndex(t => t.id === idTodo);

  if (index === -1) {
    return res.status(404).json({ error: "Todo não encontrado" });
  }

  db.data.todos = db.data.todos.filter(t => t.id !== idTodo);

  await db.write(); // salva no arquivo

  res.status(200).send('Tarefa deletada com sucesso!')
});


// Adicionar dado
app.post("/todos", async (req, res) => {
  await db.read();

  // gerar id incremental para todo
  const todos = db.data.todos
  const newId = todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1
  const newTodo = { id: newId, ...req.body }

  todos.push(newTodo)
  await db.write()

  res.status(201).json(newTodo);
});

// Iniciar servidor
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});