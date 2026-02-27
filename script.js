const perguntas = [
    {
      pergunta: "Você deve contar sua senha para amigos?",
      opcoes: ["Sim", "Não"],
      correta: 1
    },
    {
      pergunta: "É seguro clicar em links de desconhecidos?",
      opcoes: ["Sim", "Não"],
      correta: 1
    },
    {
      pergunta: "O que fazer se alguém estranho mandar mensagem?",
      opcoes: ["Responder", "Contar para um adulto"],
      correta: 1
    },
    {
      pergunta: "Você pode postar seu endereço na internet?",
      opcoes: ["Sim", "Não"],
      correta: 1
    },
    {
      pergunta: "Usar a internet por muito tempo faz bem?",
      opcoes: ["Sim", "Não"],
      correta: 1
    }
  ];
  
  let indice = 0;
  
  function mostrarPergunta() {
    document.getElementById("pergunta").innerText = perguntas[indice].pergunta;
    const opcoesDiv = document.getElementById("opcoes");
    opcoesDiv.innerHTML = "";
  
    perguntas[indice].opcoes.forEach((opcao, i) => {
      const botao = document.createElement("button");
      botao.innerText = opcao;
      botao.onclick = () => verificarResposta(i);
      opcoesDiv.appendChild(botao);
    });
  }
  
  function verificarResposta(resposta) {
    const resultado = document.getElementById("resultado");
    resultado.innerText = resposta === perguntas[indice].correta
      ? "Muito bem! Você acertou! ✅"
      : "Ops! A resposta correta é outra. ❌";
  
    indice++;
    if (indice < perguntas.length) {
      setTimeout(mostrarPergunta, 900);
    } else {
      setTimeout(() => {
        resultado.innerText = "Fim do quiz! Parabéns por aprender sobre segurança digital! 🎉";
      }, 900);
    }
  }
  
  function reiniciarQuiz() {
    indice = 0;
    document.getElementById("resultado").innerText = "";
    mostrarPergunta();
  }
  
  mostrarPergunta();