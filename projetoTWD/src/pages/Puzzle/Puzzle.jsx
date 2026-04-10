import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextoJogo } from '../../context/ContextoJogo';
import { locaisJogo } from '../../data/dadosJogo';
import './style.css';

const embaralharArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const Puzzle = () => {
  const navigate = useNavigate();
  const { personagensDesbloqueados } = useContext(ContextoJogo);
  
  const [personagensEmbaralhados, setPersonagensEmbaralhados] = useState([]);
  const [locaisEmbaralhados, setLocaisEmbaralhados] = useState([]);
  const [personagemSelecionado, setPersonagemSelecionado] = useState(null);
  const [localSelecionado, setLocalSelecionado] = useState(null);
  const [paresFeitos, setParesFeitos] = useState([]);
  const [erroAtivo, setErroAtivo] = useState(false);

  const neganDesbloqueado = personagensDesbloqueados.includes(6);

  useEffect(() => {
    if (neganDesbloqueado) {
      setPersonagensEmbaralhados(embaralharArray(locaisJogo));
      setLocaisEmbaralhados(embaralharArray(locaisJogo));
    }
  }, [neganDesbloqueado]);

  useEffect(() => {
    if (personagemSelecionado !== null && localSelecionado !== null) {
      if (personagemSelecionado === localSelecionado) {
        setParesFeitos((prev) => [...prev, personagemSelecionado]);
        setPersonagemSelecionado(null);
        setLocalSelecionado(null);
      } else {
        setErroAtivo(true);
        setTimeout(() => {
          setErroAtivo(false);
          setPersonagemSelecionado(null);
          setLocalSelecionado(null);
        }, 800);
      }
    }
  }, [personagemSelecionado, localSelecionado]);

  return (
    <main className="telaPuzzle">
      <header className="cabecalhoPuzzle">
        <h2>ENIGMA FINAL</h2>
        <p>Ligue cada sobrevivente ao local onde eles foram encontrados!</p>
      </header>

      <nav className="menuNavegacao">
        <button onClick={() => navigate('/')}>🏠 Home</button>
        <button onClick={() => navigate('/mapa')}>📍 Mapa</button>
        <button 
          className={`ativo ${!neganDesbloqueado ? 'botaoBloqueado' : ''}`}
          onClick={() => !neganDesbloqueado && alert("Bloqueado! Derrote o Negan primeiro.")}
        >
          {neganDesbloqueado ? "🧩 Enigma" : "🔒 Bloqueado"}
        </button>
        <button onClick={() => navigate('/inventario')}>🎒 Inventário</button>
      </nav>

      {!neganDesbloqueado ? (
        <section className="containerBloqueado">
          <div className="iconeCadeadoGigante">🔒</div>
          <h3>Área Restrita</h3>
          <p>Este enigma contém segredos que só podem ser revelados após você derrotar o Negan no mapa!</p>
          <button className="botaoVoltarMapa" onClick={() => navigate('/mapa')}>
            ENFRENTAR O NEGAN
          </button>
        </section>
      ) : (
        <section className="containerPuzzle">
          <div className="colunaPuzzle">
            <h3>Sobreviventes</h3>
            {personagensEmbaralhados.map((item) => {
              const estaPareado = paresFeitos.includes(item.id);
              const estaSelecionado = personagemSelecionado === item.id;
              
              return (
                <button 
                  key={`pers-${item.id}`}
                  disabled={estaPareado || erroAtivo}
                  className={`cartaoPuzzle ${estaSelecionado ? 'selecionado' : ''} ${estaPareado ? 'pareado' : ''}`}
                  onClick={() => setPersonagemSelecionado(item.id)}
                >
                  <img src={item.imagem} alt={item.personagem} className="avatarPequeno" />
                  <span>{item.personagem}</span>
                </button>
              );
            })}
          </div>

          <div className="colunaPuzzle">
            <h3>Locais no SENAI</h3>
            {locaisEmbaralhados.map((item) => {
              const estaPareado = paresFeitos.includes(item.id);
              const estaSelecionado = localSelecionado === item.id;
              
              return (
                <button 
                  key={`loc-${item.id}`}
                  disabled={estaPareado || erroAtivo}
                  className={`cartaoPuzzle local ${estaSelecionado ? 'selecionado' : ''} ${estaPareado ? 'pareado' : ''} ${erroAtivo && localSelecionado === item.id ? 'erro' : ''}`}
                  onClick={() => setLocalSelecionado(item.id)}
                >
                  <span>{item.local}</span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {paresFeitos.length === locaisJogo.length && neganDesbloqueado && (
        <div className="mensagemVitoria">
          <h3>🎉 Missão Concluída! 🎉</h3>
          <p>Você provou ser o maior sobrevivente do SENAI Roberto Mange!</p>
        </div>
      )}

      <footer className="cabecalhoLogo"><h1>TWD</h1></footer>
    </main>
  );
};

export default Puzzle;