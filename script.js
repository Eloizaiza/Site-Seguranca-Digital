/* ================= BOTÕES ================= */
let grafico = null;
function irParaQuiz() {
  document.getElementById("quiz").scrollIntoView({ behavior: "smooth" });
}

function abrirAdmin() {
  document.getElementById("adminArea").style.display = "block";
  document.getElementById("adminArea").scrollIntoView({ behavior: "smooth" });
}

function mostrarLogin() {
  document.getElementById("campoSenha").style.display = "block";
}

/* ================= QUIZ ================= */

const perguntas = [
  { pergunta: "Você deve contar sua senha para amigos?", opcoes: ["Sim", "Não"], correta: 1 },
  { pergunta: "É seguro clicar em links desconhecidos?", opcoes: ["Sim", "Não"], correta: 1 },
  { pergunta: "Se um estranho mandar mensagem?", opcoes: ["Responder", "Avisar um adulto"], correta: 1 },
  { pergunta: "Você deve usar a mesma senha em todos os sites?", opcoes: ["Sim", "Não"], correta: 1 },
  { pergunta: "Se alguém pedir foto sua online você deve:", opcoes: ["Enviar", "Recusar e avisar um adulto"], correta: 1 },
  { pergunta: "É seguro baixar jogos de qualquer site?", opcoes: ["Sim", "Não"], correta: 1 },
  { pergunta: "Você deve pensar antes de postar algo?", opcoes: ["Sim", "Não"], correta: 0 },
  { pergunta: "Golpes na internet existem?", opcoes: ["Sim", "Não"], correta: 0 }
];

let indice = 0;
let acertos = 0;

function mostrarPergunta() {
  const perguntaEl = document.getElementById("pergunta");
  const opcoesDiv = document.getElementById("opcoes");

  perguntaEl.textContent = perguntas[indice].pergunta;
  opcoesDiv.innerHTML = "";

  perguntas[indice].opcoes.forEach((opcao, i) => {
    const btn = document.createElement("button");
    btn.textContent = opcao;
    btn.className = "btnPrincipal";
    btn.onclick = () => verificarResposta(i);
    opcoesDiv.appendChild(btn);
  });
}

function verificarResposta(resp) {

  let correta = resp === perguntas[indice].correta;

  if (correta) {
    acertos++;
  }

  document.getElementById("pontuacao").textContent = acertos;

  let dicaTexto = "";

  if (correta) {
    dicaTexto = "✅ Muito bem! Você está usando seus super poderes digitais!";
  } else {
    dicaTexto = "⚠️ Atenção! Sempre pense antes de clicar e nunca compartilhe informações pessoais.";
  }

  mostrarPopupDica(dicaTexto);

  indice++;

  setTimeout(() => {
    if (indice < perguntas.length) {
      mostrarPergunta();
    } else {
      finalizarQuiz();
    }
  }, 2000);
}

function finalizarQuiz() {

  const nome = document.getElementById("nomeAluno").value;
  const idade = document.getElementById("idadeAluno").value;

  if (!nome || !idade) {
    alert("Preencha nome e idade!");
    return;
  }

  salvarResultado(nome, idade, acertos);

  const telaFinal = document.getElementById("finalTela");
  const mensagem = document.getElementById("mensagemFinal");
  const trofeu = document.getElementById("trofeuFinal");
  const pontuacaoTexto = document.getElementById("pontuacaoFinal");

  let total = perguntas.length;
  let porcentagem = (acertos / total) * 100;

  let classificacao = "";
  let emoji = "";

  if (porcentagem === 100) {
    classificacao = "🏆 OURO SUPREMO!";
    emoji = "👑";
  } else if (porcentagem >= 70) {
    classificacao = "🥈 PRATA DIGITAL!";
    emoji = "✨";
  } else {
    classificacao = "🥉 GUERREIRO INICIANTE!";
    emoji = "💪";
  }

  mensagem.innerHTML = `🎉 Missão Concluída, ${nome}!`;
  trofeu.textContent = emoji;
  pontuacaoTexto.innerHTML =
    `Você fez <strong>${acertos}/${total}</strong> pontos!<br>
     Conquistou: <strong>${classificacao}</strong>`;

  telaFinal.style.display = "flex";

  soltarConfete();
}

function reiniciarQuiz() {
  indice = 0;
  acertos = 0;
  document.getElementById("pontuacao").textContent = 0;
  document.getElementById("finalTela").style.display = "none";
  mostrarPergunta();
}

mostrarPergunta();

/* ================= SALVAR RESULTADOS ================= */

function salvarResultado(nome, idade, pontos) {
  let dados = JSON.parse(localStorage.getItem("quizResultados")) || [];

  dados.push({
    nome: nome,
    idade: idade,
    acertos: pontos
  });

  localStorage.setItem("quizResultados", JSON.stringify(dados));
}

/* ================= ADMIN SIMPLES ================= */

const senhaCorreta = "extensao2026";

function loginAdmin() {
  const senhaDigitada = document.getElementById("senhaAdmin").value;

  if (senhaDigitada === senhaCorreta) {
    document.getElementById("painelAdmin").style.display = "block";
    gerarGrafico();
  } else {
    alert("Senha incorreta!");
  }
}

/* ================= GRÁFICO CORRIGIDO ================= */

function gerarGrafico() {
  const dados = JSON.parse(localStorage.getItem("quizResultados")) || [];

  if (dados.length === 0) {
    alert("Nenhum resultado salvo ainda!");
    return;
  }

  const nomes = dados.map(d => `${d.nome} (${d.idade} anos)`);
  const pontos = dados.map(d => d.acertos);

  const ctx = document.getElementById("graficoAdmin");

  if (grafico) {
    grafico.destroy();
  }

  grafico = new Chart(ctx, {
    type: "bar",
    data: {
      labels: nomes,
      datasets: [{
        label: "Pontuação",
        data: pontos
      }]
    },
    options: {
      responsive: true,
      animation: false
    }
  });
}

/* ================= FUNDO ANIMADO INTERATIVO ================= */

const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particulas = [];

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

window.addEventListener("mousemove", e => {
  particulas.push({
    x: e.clientX,
    y: e.clientY,
    radius: 8,
    color: `hsl(${Math.random() * 360}, 100%, 60%)`
  });
});

function animar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particulas.forEach((p, i) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    p.radius *= 0.96;

    if (p.radius < 0.5) {
      particulas.splice(i, 1);
    }
  });

  requestAnimationFrame(animar);
}

animar();

function soltarConfete() {
  for (let i = 0; i < 120; i++) {
    const confete = document.createElement("div");
    confete.style.position = "fixed";
    confete.style.width = "8px";
    confete.style.height = "8px";
    confete.style.backgroundColor = `hsl(${Math.random()*360},100%,50%)`;
    confete.style.left = Math.random() * 100 + "vw";
    confete.style.top = "-10px";
    confete.style.zIndex = 1000;
    confete.style.borderRadius = "50%";
    confete.style.animation = "cairConfete 3s linear forwards";
    document.body.appendChild(confete);

    setTimeout(() => confete.remove(), 3000);
  }
}
function mostrarPopupDica(texto) {
  const popup = document.createElement("div");
  popup.className = "popupDica";
  popup.textContent = texto;

  document.body.appendChild(popup);

  setTimeout(() => {
    popup.remove();
  }, 2000);
}
