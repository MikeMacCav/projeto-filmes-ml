// server/server.js
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, "../public")));

// Rota raiz
app.get("/", (req, res) => {
  res.send("🚀 Servidor funcionando! Acesse /health para verificar o status ou coloque seus arquivos em /public.");
});

// Rota de healthcheck
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Servidor rodando!" });
});

// Inicializa servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

