# 🎬 CRUD de Filmes - Projeto em Node.js, Express e MySQL (AWS RDS + EC2)

Este projeto implementa um sistema **CRUD (Create, Read, Update, Delete)** de filmes, utilizando:
- **Node.js + Express** para o backend  
- **MySQL RDS (AWS)** como banco de dados  
- **EC2 (Ubuntu Server)** como servidor de aplicação  
- **PM2 + systemd** para gerenciamento de processos e deploy  
- **HTML + JavaScript (Fetch API)** para interface web  

---

## 📌 Funcionalidades
- ➕ Adicionar filmes  
- 📋 Listar todos os filmes  
- 🔍 Buscar filme por ID  
- ✏️ Atualizar filme existente  
- ❌ Deletar filme  

O sistema expõe tanto uma **API REST JSON** quanto uma **interface web simples** para manipulação dos dados.

---

## 🛠️ Tecnologias Utilizadas
- [Node.js](https://nodejs.org/)  
- [Express](https://expressjs.com/)  
- [MySQL RDS - AWS](https://aws.amazon.com/rds/mysql/)  
- [Amazon EC2](https://aws.amazon.com/ec2/)  
- [PM2](https://pm2.keymetrics.io/)  
- HTML, CSS e JavaScript (frontend simples)  

---

## ⚙️ Configuração do Ambiente

### 1️⃣ Banco de Dados (AWS RDS)
1. Criar uma instância **MySQL** no RDS.  
2. Criar banco e tabela:

```sql
CREATE DATABASE projeto_filmes;
USE projeto_filmes;

CREATE TABLE filmes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(100) NOT NULL,
  diretor VARCHAR(100),
  ano INT,
  genero VARCHAR(50)
);

## Criar usuário e permissões:

# CREATE USER 'administrador'@'%' IDENTIFIED BY 'SUA_SENHA';
# GRANT ALL PRIVILEGES ON projeto_filmes.* TO 'administrador'@'%';
# ALTER USER 'administrador'@'%' IDENTIFIED WITH mysql_native_password BY 'SUA_SENHA';
# FLUSH PRIVILEGES;

## Servidor EC2 (Ubuntu)
- Criar uma instância EC2 Ubuntu.
- Conectar via SSH:

- ssh -i sua-chave.pem ubuntu@SEU_IP_PUBLICO

## Instalar dependências:

- sudo apt update && sudo apt upgrade -y
- sudo apt install -y nodejs npm mysql-client


## Clonar o repositório:

- git clone https://github.com/SEU_USUARIO/projeto-filmes-ml.git
- cd projeto-filmes-ml
- npm install

## Variáveis de Ambiente

- Criar arquivo .env na raiz:

-RDS_HOST=seu-endpoint-rds.amazonaws.com
- RDS_USER=administrador
- RDS_PASSWORD=SUA_SENHA
- RDS_DB=projeto_filmes
- DB_PORT=3306
- PORT=3000
## PM2 e Deploy

- Instalar e configurar o PM2:

- sudo npm install -g pm2
- pm2 start src/server/server.js --name projeto-filmes
- pm2 save
- pm2 startup systemd -u ubuntu --hp /home/ubuntu

## 📑 Documentação da API
## 🔹 Healthcheck

- GET /health
- ✔️ Retorna status do servidor.

## 🔹 Filmes

- Criar filme

- POST /filmes
- Content-Type: application/json

- {
  - "titulo": "Matrix",
  - "diretor": "Wachowski",
  - "ano": 1999,
  - "genero": "Ficção"
- }


## Listar filmes

- GET /filmes

- **Listar filmes**
- ```http
- GET /filmes
- ✔️ Retorna todos os filmes cadastrados no banco.

## Buscar filme por ID

- http
- Copiar código
- GET /filmes/:id
- ✔️ Retorna os dados de um filme específico.
- ❌ Se não existir, retorna 404 - Filme não encontrado.

## Atualizar filme

- http
- Copiar código
- PUT /filmes/:id
- Content-Type: application/json

-{
-  "titulo": "Matrix Reloaded",
-  "diretor": "Wachowski",
-  "ano": 2003,
-  "genero": "Ficção"
-}
-✔️ Atualiza os dados do filme correspondente.
-❌ Se o id não existir, retorna 404 - Filme não encontrado.

## Deletar filme

- http
- Copiar código
- DELETE /filmes/:id
- ✔️ Remove o filme correspondente.
- ❌ Se o id não existir, retorna 404 - Filme não encontrado.

## 🌐 Interface Web
- O frontend está em public/index.html.

- Ele consome diretamente os endpoints da API usando Fetch API.

- Funcionalidades disponíveis na interface:

- ➕ Adicionar filme

## 📋 Listar filmes

- ✏️ Atualizar filme

- ❌ Deletar filme

- Acesse no navegador:
- cpp
- Copiar código
- http://SEU_IP_PUBLICO:3000/

## 🔒 Observações de Segurança

- Nunca commitar senhas no GitHub (use .env).

- Configure Security Groups da AWS para liberar apenas as portas necessárias (3000, 3306, 22).

-Em produção, usar HTTPS (Nginx + Certbot).

- Criar um usuário com permissões limitadas no banco (não usar root).
