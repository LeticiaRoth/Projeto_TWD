import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextoJogo } from '../../context/ContextoJogo';
import { locaisJogo } from '../../data/dadosJogo';
import './style.css';

const Mapa = () => {
  const { faseAtual, personagensDesbloqueados } = useContext(ContextoJogo);
  const navigate = useNavigate();
  const [mostrarAviso, setMostrarAviso] = useState(false);

  const neganDesbloqueado = personagensDesbloqueados.includes(6);

  const lidarCliqueEnigma = () => {
    if (neganDesbloqueado) {
      navigate('/puzzle');
    } else {
      setMostrarAviso(true);
      setTimeout(() => setMostrarAviso(false), 3000);
    }
  };

  return (
    <main className="telaMapa">
      <header className="cabecalhoMapa">
        <h2>Comece sua procura!!</h2>
        <p>Selecione um dos locais abaixo para encontrar nossos personagens!</p>
      </header>
      
      <nav className="menuNavegacao">
        <button onClick={() => navigate('/')}>🏠 Home</button>
        <button className="ativo">📍 Mapa</button>
        
        <div className="containerLinkBloqueado">
          <button 
            className={!neganDesbloqueado ? 'botaoBloqueado' : ''}
            onClick={lidarCliqueEnigma}
            onMouseEnter={() => !neganDesbloqueado && setMostrarAviso(true)}
            onMouseLeave={() => setMostrarAviso(false)}
          >
            {neganDesbloqueado ? "🧩 Enigma" : "🔒 Bloqueado"}
          </button>
          
          {mostrarAviso && !neganDesbloqueado && (
            <div className="balaoAviso">
              Encontre o Negan no mapa primeiro!
            </div>
          )}
        </div>

        <button onClick={() => navigate('/inventario')}>🎒 Inventário</button>
      </nav>

      <section className="containerMapaImagem">
        {locaisJogo.map((local) => {
          const estaDesbloqueado = local.id < faseAtual;
          const estaAtivo = local.id === faseAtual;
          const estaBloqueado = local.id > faseAtual;

          let classeEstado = 'bloqueado';
          if (estaDesbloqueado) classeEstado = 'desbloqueado';
          if (estaAtivo) classeEstado = 'ativo';

          return (
            <div 
              key={local.id}
              className={`pontoMapa ponto${local.id} ${classeEstado}`}
              onClick={() => {
                if (estaAtivo) navigate(`/quiz/${local.id}`);
              }}
            >
              {estaBloqueado && <div className="iconeCadeado">🔒</div>}
              {estaAtivo && <div className="iconeCadeado ativoAnimado">🔓</div>}
              {estaDesbloqueado && <div className="iconeAvatar"><img src={local.imagem} alt={local.personagem} /></div>}
              <div className="etiquetaLocal">{local.personagem}<br/><span>{local.local}</span></div>
            </div>
          );
        })}
      </section>

      <footer className="cabecalhoLogo">
        <h1>TWD</h1>
      </footer>
    </main>
  );
};

export default Mapa;