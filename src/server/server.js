// src/server/server.js
const express = require("express");
const cors = require("cors");
const path = require("path");
const mysql = require("mysql2/promise");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../../public")));

const express = require("express");
const cors = require("cors");
const path = require("path");
const mysql = require("mysql2/promise");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Configuração do banco
const pool = mysql.createPool({
  host: process.env.RDS_HOST,
  user: process.env.RDS_USER,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB,
  port: process.env.DB_PORT || 3306
});

// ------------------- CRUD ------------------- //

// Criar um filme
app.post("/filmes", async (req, res) => {
  const { titulo, diretor, ano, genero } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO filmes (titulo, diretor, ano, genero) VALUES (?, ?, ?, ?)",
      [titulo, diretor, ano, genero]
    );
    res.status(201).json({ id: result.insertId, titulo, diretor, ano, genero });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao inserir filme" });
  }
});

// Listar filmes
app.get("/filmes", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM filmes");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar filmes" });
  }
});

// Atualizar filme
app.put("/filmes/:id", async (req, res) => {
  const { id } = req.params;
  const { titulo, diretor, ano, genero } = req.body;
  try {
    await pool.query(
      "UPDATE filmes SET titulo=?, diretor=?, ano=?, genero=? WHERE id=?",
      [titulo, diretor, ano, genero, id]
    );
    res.json({ id, titulo, diretor, ano, genero });
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar filme" });
  }
});

// Deletar filme
app.delete("/filmes/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM filmes WHERE id=?", [id]);
    res.json({ message: "Filme deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar filme" });
  }
});

// -------------------------------------------- //

// Healthcheck
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Servidor rodando!" });
});

// Inicializa servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});



// Conexão com MySQL
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.RDS_HOST,
  user: process.env.RDS_USER,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB,
  port: process.env.DB_PORT
});

// Testar conexão
db.connect(err => {
  if (err) {
    console.error("Erro ao conectar no MySQL:", err);
    return;
  }
  console.log("Conectado ao MySQL com sucesso!");
});

// ---------------- CRUD ----------------

// [GET] Listar todos os filmes
app.get("/filmes", (req, res) => {
  db.query("SELECT * FROM filmes", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

// [POST] Criar novo filme
app.post("/filmes", (req, res) => {
  const { titulo, diretor, ano, genero } = req.body;
  const sql = "INSERT INTO filmes (titulo, diretor, ano, genero) VALUES (?, ?, ?, ?)";
  db.query(sql, [titulo, diretor, ano, genero], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.status(201).json({ id: result.insertId, titulo, diretor, ano, genero });
  });
});

// [PUT] Atualizar um filme pelo id
app.put("/filmes/:id", (req, res) => {
  const { id } = req.params;
  const { titulo, diretor, ano, genero } = req.body;
  const sql = "UPDATE filmes SET titulo=?, diretor=?, ano=?, genero=? WHERE id=?";
  db.query(sql, [titulo, diretor, ano, genero, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ message: "Filme atualizado com sucesso!" });
  });
});

// [DELETE] Deletar um filme pelo id
app.delete("/filmes/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM filmes WHERE id=?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json({ message: "Filme deletado com sucesso!" });
  });
});


// Conexão com o banco RDS MySQL
const pool = mysql.createPool({
  host: process.env.RDS_HOST,
  user: process.env.RDS_USER,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB,
  port: process.env.DB_PORT || 3306,
});

// 📌 Healthcheck
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Servidor rodando!" });
});

// 📌 CREATE - adicionar filme
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

// 📌 READ - listar todos os filmes
app.get("/filmes", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM filmes");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📌 READ - buscar filme por ID
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

// 📌 UPDATE - atualizar filme por ID
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

// 📌 DELETE - remover filme por ID
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

// Inicia servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

