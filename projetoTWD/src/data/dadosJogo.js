import carlImg from '../assets/carl.png';
import glennImg from '../assets/glenn.png';
import darylImg from '../assets/daryl.png';
import rickImg from '../assets/rick.png';
import michonneImg from '../assets/michonne.png';
import neganImg from '../assets/negan.png';

export const locaisJogo = [
  {
    id: 1,
    personagem: "Carl Grimes",
    local: "Sala dos Professores",
    frase: "Meu pai me ensinou a sobreviver. Mas sobreviver não é suficiente.",
    pergunta: "O que Carl perdeu durante a série?",
    opcoes: ["Um braço", "Um olho", "Uma perna", "A memória"],
    respostaCorreta: "Um olho",
    imagem: carlImg 
  },
  {
    id: 2,
    personagem: "Glenn Rhee",
    local: "Lanchonete",
    frase: "Eu irei encontrar você!",
    pergunta: "Qual era o trabalho de Glenn antes do apocalipse?",
    opcoes: ["Mecânico", "Policial", "Entregador de pizza", "Professor"],
    respostaCorreta: "Entregador de pizza",
    imagem: glennImg
  },
  {
    id: 3,
    personagem: "Daryl Dixon",
    local: "Oficina",
    frase: "Nós não somos como eles",
    pergunta: "Qual é a arma característica de Daryl?",
    opcoes: ["Katana", "Revólver", "Besta", "Machado"],
    respostaCorreta: "Besta",
    imagem: darylImg
  },
  {
    id: 4,
    personagem: "Rick Grimes",
    local: "Sala do Lucas",
    frase: "Nós somos aqueles que vivem",
    pergunta: "Qual era a profissão de Rick antes do apocalipse?",
    opcoes: ["Médico", "Policial (xerife)", "Professor", "Militar"],
    respostaCorreta: "Policial (xerife)",
    imagem: rickImg
  },
  {
    id: 5,
    personagem: "Michonne",
    local: "Busto Mange",
    frase: "Eu não tenho mais medo.",
    pergunta: "Qual é a arma principal de Michonne?",
    opcoes: ["Machado", "Arco e flecha", "Katana", "Pistola dupla"],
    respostaCorreta: "Katana",
    imagem: michonneImg
  },
  {
    id: 6,
    personagem: "Negan",
    local: "Biblioteca",
    frase: "Eu sou Negan",
    pergunta: "Qual é o nome do taco de beisebol de Negan?",
    opcoes: ["Betty", "Ruby", "Lucille", "Maggie"],
    respostaCorreta: "Lucille",
    imagem: neganImg
  }
];