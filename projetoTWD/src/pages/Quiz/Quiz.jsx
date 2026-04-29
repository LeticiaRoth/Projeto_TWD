import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ContextoJogo } from '../../context/ContextoJogo';
import { locaisJogo } from '../../data/dadosJogo';
import ModalDesbloqueio from '../../components/ModalDesbloqueio/ModalDesbloqueio';
import './style.css';

const Quiz = () => {
  //Personagem desbloqueado de acordo com a pergunta
  const { id } = useParams();
  const navigate = useNavigate();
  const { desbloquearPersonagem } = useContext(ContextoJogo);

  //Modais dentro do quiz, ao responder as perguntas
  const [modalAberto, setModalAberto] = useState(false);
  const [modalErroAberto, setModalErroAberto] = useState(false);
  const [mostrarFinal, setMostrarFinal] = useState(false);

  const local = locaisJogo.find(l => l.id === parseInt(id));

  //Resposta e lógica da abertura do modal
  const lidarComResposta = (opcaoSelecionada) => {
    if (opcaoSelecionada === local.respostaCorreta) {
      desbloquearPersonagem(local.id);
      if (local.id === 6) {
        setMostrarFinal(true);
      } else {
        setModalAberto(true);
      }
    } else {
      setModalErroAberto(true);
    }
  };

  if (!local) return <p>Local não encontrado.</p>;

  return (
    <>
      <header className="cabecalhoQuiz">
        <h2>QUIZ DE THE WALKING DEAD</h2>
        <p>Acerte a pergunta e garanta o seu botton do personagem que marcou a série!</p>
      </header>

      <main className="telaQuiz">
        <button className="botaoVoltar" onClick={() => navigate('/mapa')}>⬅ MAPA</button>

        {/*Corpo da pergunta e o quiz como um todo */}
        <article className="cartaoQuiz">
          <div className="avatarQuiz">
            <img src={local.imagem} alt={local.personagem} />
          </div>
          <blockquote className="frasePersonagem">"{local.frase}"</blockquote>

          {/*Área da pergunta */}
          <section className="areaPergunta">
            <h3>{local.pergunta}</h3>
            {/*Lista de opções das perguntas feitas sobre cada personage, */}
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

        {/*Modal da frase com o personagem dentro */}
        {modalAberto && (
          <ModalDesbloqueio
            personagem={local}
            aoFechar={() => navigate('/mapa')}
          />
        )}

        {/*Modal de erro, quando erra a pergunta */}
        {modalErroAberto && (
          <div className="sobreposicaoModalErro">
            <div className="conteudoModalErro">
              <h2>Ops! Resposta Incorreta 🧟‍♂️</h2>
              <p>Parece que os zumbis confundiram sua memória. Tente novamente!</p>
              <button className="botaoTentarNovamente" onClick={() => setModalErroAberto(false)}>
                Tentar Novamente
              </button>
            </div>
          </div>
        )}

        {/*Modal final - Assim que termina todos as perguntas */}
        {mostrarFinal && (
          <div className="sobreposicaoModalSucesso">
            <div className="conteudoModalSucesso">
              <div className="trofeuFinal">🏆</div>
              <h2>INCRÍVEL!!</h2>
              <p>Você encontrou todos os sobreviventes perdidos no SENAI Roberto Mange!</p>
              <p>Agora seu inventário está completo para enfrentar o apocalipse.</p>
              <button className="botaoVerInventario" onClick={() => navigate('/inventario')}>
                VER MEU INVENTÁRIO
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Quiz;