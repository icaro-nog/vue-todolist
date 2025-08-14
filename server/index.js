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

// Adicionar dado
app.post("/todos", async (req, res) => {
  await db.read();
  db.data.todos.push(req.body);
  await db.write();
  res.status(201).json(req.body);
});

// Iniciar servidor
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});