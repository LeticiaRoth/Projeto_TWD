import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextoJogo } from '../../context/ContextoJogo';
import { locaisJogo } from '../../data/dadosJogo';
import './style.css';

const Mapa = () => {
  const { faseAtual } = useContext(ContextoJogo);
  const navigate = useNavigate();

  return (
    <main className="telaMapa">
      <header className="cabecalhoMapa">
        <h2>Comece sua procura!!</h2>
        <p>Selecione um dos locais abaixo, você terá que acertar a pergunta para encontrar o nosso personagem!</p>
      </header>
      
      <nav className="menuNavegacao">
        <button onClick={() => navigate('/')}>🏠 Home</button>
        <button className="ativo">📍 Mapa</button>
        <button onClick={() => navigate('/inventario')}>🎒 Inventário</button>
      </nav>

      <section className="containerMapaImagem">
        {/* A imagem do mapa fica como background no CSS da classe containerMapaImagem */}
        
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