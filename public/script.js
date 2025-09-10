const API_URL = "/filmes";

// Adicionar Filme
document.querySelector("#btnAdd").addEventListener("click", async () => {
  const titulo = document.querySelector("#titulo").value;
  const diretor = document.querySelector("#diretor").value;
  const ano = document.querySelector("#ano").value;
  const genero = document.querySelector("#genero").value;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo, diretor, ano, genero }),
  });

  const data = await res.json();
  alert("🎬 Filme adicionado: " + JSON.stringify(data));
});

// Listar Filmes
document.querySelector("#btnList").addEventListener("click", async () => {
  const res = await fetch(API_URL);
  const filmes = await res.json();

  const lista = document.querySelector("#listaFilmes");
  lista.innerHTML = filmes
    .map((f) => `<li><b>ID:</b> ${f.id} | <b>${f.titulo}</b> - ${f.diretor} (${f.ano}) [${f.genero}]</li>`)
    .join("");
});

// Buscar Filme por ID
document.querySelector("#btnBuscar").addEventListener("click", async () => {
  const id = document.querySelector("#buscarId").value;
  const res = await fetch(`${API_URL}/${id}`);
  const resultado = document.querySelector("#resultadoBuscar");

  if (res.status === 404) {
    resultado.innerHTML = "❌ Filme não encontrado";
    return;
  }

  const filme = await res.json();
  resultado.innerHTML = `<div class="filme"><b>ID:</b> ${filme.id} | <b>${filme.titulo}</b> - ${filme.diretor} (${filme.ano}) [${filme.genero}]</div>`;
});

// Atualizar Filme
document.querySelector("#btnUpdate").addEventListener("click", async () => {
  const id = document.querySelector("#updateId").value;
  const titulo = document.querySelector("#updateTitulo").value;
  const diretor = document.querySelector("#updateDiretor").value;
  const ano = document.querySelector("#updateAno").value;
  const genero = document.querySelector("#updateGenero").value;

  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo, diretor, ano, genero }),
  });

  const data = await res.json();
  alert("✏️ Filme atualizado: " + JSON.stringify(data));
});

// Deletar Filme
document.querySelector("#btnDelete").addEventListener("click", async () => {
  const id = document.querySelector("#deleteId").value;

  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  const data = await res.json();
  alert("🗑️ " + data.message);
});