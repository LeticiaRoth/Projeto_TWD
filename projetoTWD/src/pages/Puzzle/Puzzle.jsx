import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextoJogo } from '../../context/ContextoJogo';
import { locaisJogo } from '../../data/dadosJogo';
import './style.css';

// Importação dos ícones 
import iconeHome from '../../assets/icons/iconeHome.svg';
import iconeMapa from '../../assets/icons/iconeMapa.svg';
import iconePuzzle from '../../assets/icons/iconePuzzle.svg';
import iconeInventario from '../../assets/icons/iconeInventario.svg';

// Embaralha dos dados
const embaralharArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const Puzzle = () => {
  const navigate = useNavigate();
  const { personagensDesbloqueados } = useContext(ContextoJogo);

  //Estados do "baralho"
  const [personagensEmbaralhados, setPersonagensEmbaralhados] = useState([]);
  const [locaisEmbaralhados, setLocaisEmbaralhados] = useState([]);
  const [personagemSelecionado, setPersonagemSelecionado] = useState(null);
  const [localSelecionado, setLocalSelecionado] = useState(null);
  const [paresFeitos, setParesFeitos] = useState([]); 
  const [erroAtivo, setErroAtivo] = useState(false); 

  // Lógica para verificar se o Negan foi desbloqueado
  const neganDesbloqueado = personagensDesbloqueados.includes(6);

  // Embaralha os dados assim que o componente carrega
  useEffect(() => {
    if (neganDesbloqueado) {
      setPersonagensEmbaralhados(embaralharArray(locaisJogo));
      setLocaisEmbaralhados(embaralharArray(locaisJogo));
    }
  }, [neganDesbloqueado]);

  useEffect(() => {
    if (personagemSelecionado !== null && localSelecionado !== null) {
      if (personagemSelecionado === localSelecionado) {
        // Se os IDs forem iguais, o par está correto
        setParesFeitos((prev) => [...prev, personagemSelecionado]);
        setPersonagemSelecionado(null);
        setLocalSelecionado(null);
      } else {
        // Se estiver errado, ativa o erro e limpa a seleção após um tempinho
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
    <>
      <header className="cabecalhoPuzzle">
        <h2>ENIGMA FINAL</h2>
        <p>Ligue cada sobrevivente ao local onde eles foram encontrados!</p>
      </header>

      <main className="telaPuzzle">
        {/*Navegação */}
        <nav className="menuNavegacao">
          <button onClick={() => navigate('/')}>
            <img src={iconeHome} alt="" className="nav-icon" /> Home
          </button>
          <button onClick={() => navigate('/mapa')}>
            <img src={iconeMapa} alt="" className="nav-icon" /> Mapa
          </button>
          <button
            className={`ativo ${!neganDesbloqueado ? 'botaoBloqueado' : ''}`}
            onClick={() => !neganDesbloqueado && alert("Bloqueado!")}
          >
            <img src={iconePuzzle} alt="" className="nav-icon" />
            {neganDesbloqueado ? " Enigma" : " Bloqueado"}
          </button>
          <button onClick={() => navigate('/inventario')}>
            <img src={iconeInventario} alt="" className="nav-icon" /> Inventário
          </button>
        </nav>

        {!neganDesbloqueado ? (
          <section className="containerBloqueado">
            <div className="iconeCadeadoGigante">🔒</div>
            <h3>Área Restrita</h3>
            <p>Derrote o Negan no mapa primeiro!</p>
            <button className="botaoVoltarMapa" onClick={() => navigate('/mapa')}>
              ENFRENTAR O NEGAN
            </button>
          </section>
        ) : (
          // Puzzle
          <section className="containerPuzzle">
            {/* Coluna de Sobreviventes */}
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
                    <img src={item.imagem} alt="" className="avatarPequeno" />
                    <span>{item.personagem}</span>
                  </button>
                );
              })}
            </div>

            {/* Coluna de Locais */}
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

        {/* Feedback de Vitória */}
        {paresFeitos.length === locaisJogo.length && neganDesbloqueado && (
          <div className="mensagemVitoria">
            <h3>🎉 Missão Concluída! 🎉</h3>
          </div>
        )}
      </main>
    </>
  );
};

export default Puzzle;