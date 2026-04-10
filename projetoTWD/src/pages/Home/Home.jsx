import React from 'react';
import { useNavigate } from 'react-router-dom';
import Carrossel from '../../components/Carrossel/Carrossel';
import './style.css';

import gameImagem from '../../assets/image/gameImagem.png';
import zumbiImagem from '../../assets/image/zumbiImagen.png';
import imagemTV from '../../assets/image/imagemTV.png';
import imagemInterrogacao from '../../assets/image/imagemInterrogacao.png';

const imagensBanner = [
  { src: '/assets/banner_twd.jpg', alt: 'The Walking Dead - Banner 1' },
  { src: '/assets/banner_twd_2.jpg', alt: 'The Walking Dead - Banner 2' },
  { src: '/assets/banner_twd_3.jpg', alt: 'The Walking Dead - Banner 3' }
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="telaHome">
      <header className="cabecalhoHome">
        <h2>SEJA BEM - VINDO (A)!!</h2>
        <p>Encontre todos os personagens de TWD que estão sobrevivendo no SENAI Roberto Mange.</p>
      </header>

      <section className="secaoCarrosselDestaque">
        <Carrossel imagens={imagensBanner} />
      </section>

      <div className="conteudoHomeAlinhado">
        
        <section className="secaoAcoes">
          <h3>SELECIONE</h3>
          <div className="botoesAcao">
            <button className="botaoAcao" onClick={() => navigate('/mapa')}>
              <img src={gameImagem} alt="Começar Jogo" className="imgIconeAcao" />
              <span>COMEÇAR JOGO</span>
              <div className="subBotaoEscuro">PLAY</div>
            </button>
            
            <button className="botaoAcao" onClick={() => navigate('/inventario')}>
              <img src={zumbiImagem} alt="Inventário" className="imgIconeAcao" />
              <span>INVENTÁRIO</span>
              <div className="subBotaoEscuro">VER AGORA</div>
            </button>
          </div>
        </section>

        <section className="secaoInformacoes">
          <article className="cartaoInfo">
            <div className="blocoImagemInfo">
              <img src={imagemTV} alt="Sobre a série" className="imgInfo" />
            </div>
            <div className="textoInfo">
              <h4>Sobre a série - The Walking Dead</h4>
              <p>Após acordar de um coma, o policial Rick Grimes descobre que o mundo foi destruído por um apocalipse zumbi. Ao reencontrar sua família, ele passa a liderar um grupo de sobreviventes na luta por proteção e sobrevivência.</p>
            </div>
          </article>
          
          <article className="cartaoInfo invertido">
            <div className="textoInfo">
              <h4>Sobre a plataforma</h4>
              <p>Plataforma de geolocalização para encontrar os personagens perdidos da série dentro do SENAI Roberto Mange, de forma que ao encontrar você descobrirá uma surpresa.</p>
            </div>
            <div className="blocoImagemInfo">
              <img src={imagemInterrogacao} alt="Sobre a plataforma" className="imgInfo" />
            </div>
          </article>
        </section>

      </div>

      <footer className="cabecalhoLogo">
        <h1>TWD</h1>
      </footer>
    </main>
  );
};

export default Home;