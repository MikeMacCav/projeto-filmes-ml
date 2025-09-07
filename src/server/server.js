// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mysql = require("mysql2/promise");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../../public")));

// Conexão com o banco RDS MySQL
const pool = mysql.createPool({
  host: process.env.RDS_HOST,
  user: process.env.RDS_USER,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB,
  port: process.env.DB_PORT || 3306,
});

// ------------------- CRUD ------------------- //

// CREATE - adicionar filme
app.post("/filmes", async (req, res) => {
  try {
    const { titulo, diretor, ano, genero } = req.body;
    const [result] = await pool.query(
      "INSERT INTO filmes (titulo, diretor, ano, genero) VALUES (?, ?, ?, ?)",
      [titulo, diretor, ano, genero]
    );
    res.status(201).json({ id: result.insertId, titulo, diretor, ano, genero });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - listar todos os filmes
app.get("/filmes", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM filmes");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ - buscar filme por ID
app.get("/filmes/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM filmes WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Filme não encontrado" });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE - atualizar filme por ID
app.put("/filmes/:id", async (req, res) => {
  try {
    const { titulo, diretor, ano, genero } = req.body;
    const [result] = await pool.query(
      "UPDATE filmes SET titulo=?, diretor=?, ano=?, genero=? WHERE id=?",
      [titulo, diretor, ano, genero, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Filme não encontrado" });
    }
    res.json({ id: req.params.id, titulo, diretor, ano, genero });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE - remover filme por ID
app.delete("/filmes/:id", async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM filmes WHERE id=?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Filme não encontrado" });
    }
    res.json({ message: "Filme deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Healthcheck
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Servidor rodando!" });
});

// Inicia servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

