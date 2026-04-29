import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextoJogo } from '../../context/ContextoJogo';
import { locaisJogo } from '../../data/dadosJogo';
import './style.css';

//Importação dos icones
import iconeHome from '../../assets/icons/iconeHome.svg';
import iconeMapa from '../../assets/icons/iconeMapa.svg';
import iconePuzzle from '../../assets/icons/iconePuzzle.svg';
import iconeInventario from '../../assets/icons/iconeInventario.svg';

//Lógica do mapa e do caminho do puzzle
const Mapa = () => {
  const { faseAtual, personagensDesbloqueados } = useContext(ContextoJogo);
  const navigate = useNavigate();
  const [mostrarAviso, setMostrarAviso] = useState(false);

  //Quando o negan for desbloqueado
  const neganDesbloqueado = personagensDesbloqueados.includes(6);

  //Puzzel, liberado apenas de encontrar todos os personagens
  const lidarCliqueEnigma = () => {
    if (neganDesbloqueado) {
      navigate('/puzzle');
    } else {
      setMostrarAviso(true);
      setTimeout(() => setMostrarAviso(false), 3000);
    }
  };

  return (
    <>
      <header className="cabecalhoMapa">
        <h2>Comece sua procura!!</h2>
        <p>Selecione um dos locais abaixo para encontrar nossos personagens!</p>
      </header>

      <main className="telaMapa">
        {/*Menu de navegação do TWD - MAPA */}
        <nav className="menuNavegacao">

          {/*Icone Home */}
          <button onClick={() => navigate('/')}>
            <img src={iconeHome} alt="Icone de casa para simular a Home" className="nav-icon" /> Home
          </button>

          {/*Icone do Mapa*/}
          <button className="ativo">
            <img src={iconeMapa} alt="Iocne do mapa, leva a página do jogo" className="nav-icon" /> Mapa
          </button>

          {/*Icone do Enigma - lógica de liberação */}
          <div className="containerLinkBloqueado">
            <button
              className={!neganDesbloqueado ? 'botaoBloqueado' : ''}
              onClick={lidarCliqueEnigma}
              onMouseEnter={() => !neganDesbloqueado && setMostrarAviso(true)}
              onMouseLeave={() => setMostrarAviso(false)}
            >
              <img src={iconePuzzle} alt="" className="nav-icon" />
              {neganDesbloqueado ? " Enigma" : " Bloqueado"}
            </button>

            {/*Avisa - encontrar Negan antes de liberar */}
            {mostrarAviso && !neganDesbloqueado && (
              <div className="balaoAviso">
                Encontre o Negan no mapa primeiro!
              </div>
            )}
          </div>

          <button onClick={() => navigate('/inventario')}>
            <img src={iconeInventario} alt="Icone do inventario" className="nav-icon" /> Inventário
          </button>
        </nav>
        
        {/*Container do Mapa */}
        <section className="containerMapaImagem">
          {locaisJogo.map((local) => {
            const estaDesbloqueado = local.id < faseAtual;
            const estaAtivo = local.id === faseAtual;
            const estaBloqueado = local.id > faseAtual;

            let classeEstado = 'bloqueado';
            if (estaDesbloqueado) classeEstado = 'desbloqueado';
            if (estaAtivo) classeEstado = 'ativo';

            return (
              //Lógica dos pontos dentro do mapa
              <div
                key={local.id}
                className={`pontoMapa ponto${local.id} ${classeEstado}`}
                onClick={() => {
                  if (estaAtivo) navigate(`/quiz/${local.id}`);
                }}
              >
                {/*Ativo, Bloqueado e Desbloqueado */}
                {estaBloqueado && <div className="iconeCadeado">🔒</div>}
                {estaAtivo && <div className="iconeCadeado ativoAnimado">🔓</div>}
                {estaDesbloqueado && (
                  <div className="iconeAvatar">
                    <img src={local.imagem} alt={local.personagem} />
                  </div>
                )}
                {/*Liberação do personagem */}
                <div className="etiquetaLocal">
                  {local.personagem}<br /><span>{local.local}</span>
                </div>
              </div>
            );
          })}
        </section>
      </main>
        
    </>
  );
};

export default Mapa;