import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ContextoJogo } from '../../context/ContextoJogo';
import { locaisJogo } from '../../data/dadosJogo';
import ModalDesbloqueio from '../../components/ModalDesbloqueio/ModalDesbloqueio';
import './style.css';

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { desbloquearPersonagem } = useContext(ContextoJogo);
  const [modalAberto, setModalAberto] = useState(false);
  
  const local = locaisJogo.find(l => l.id === parseInt(id));

  const lidarComResposta = (opcaoSelecionada) => {
    if (opcaoSelecionada === local.respostaCorreta) {
      desbloquearPersonagem(local.id);
      setModalAberto(true);
    } else {
      alert("Resposta incorreta! Tente novamente.");
    }
  };

  if (!local) return <p>Local não encontrado.</p>;

  return (
    <main className="telaQuiz">
      <header className="cabecalhoQuiz">
        <h2>QUIZ DE THE WALKING DEAD</h2>
        <p>Acerte a pergunta e garanta o seu botton do personagem que marcou a série!</p>
      </header>

      <button className="botaoVoltar" onClick={() => navigate('/mapa')}>⬅ MAPA</button>

      <article className="cartaoQuiz">
        <div className="avatarQuiz">
          <img src={local.imagem} alt={local.personagem} />
        </div>
        <blockquote className="frasePersonagem">"{local.frase}"</blockquote>

        <section className="areaPergunta">
          <h3>{local.pergunta}</h3>
          <div className="listaOpcoes">
            {local.opcoes.map((opcao, index) => (
              <button 
                key={index} 
                className="botaoOpcao"
                onClick={() => lidarComResposta(opcao)}
              >
                <span className="letraOpcao">{String.fromCharCode(65 + index)}</span>
                <span className="textoOpcao">{opcao}</span>
              </button>
            ))}
          </div>
        </section>
      </article>

      {modalAberto && (
        <ModalDesbloqueio 
          personagem={local} 
          aoFechar={() => navigate('/mapa')} 
        />
      )}

      <footer className="cabecalhoLogo"><h1>TWD</h1></footer>
    </main>
  );
};

export default Quiz;