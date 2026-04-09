import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="telaHome">
      <header className="cabecalhoHome">
        <h2>SEJA BEM - VINDO (A)!!</h2>
        <p>Encontre todos os personagens de TWD que estão sobrevivendo no SENAI Roberto Mange.</p>
      </header>

      <section className="carrosselDestaque">
        <div className="imagemCarrosselPlaceholder">
          {/* Coloque a imagem do banner do TWD aqui */}
          <img src="/assets/banner_twd.jpg" alt="The Walking Dead" />
        </div>
      </section>

      <section className="secaoAcoes">
        <h3>SELECIONE</h3>
        <div className="botoesAcao">
          <button className="botaoAcao principal" onClick={() => navigate('/mapa')}>
            <span className="iconeBotao">🎮</span>
            <span>COMEÇAR JOGO</span>
            <div className="subBotaoEscuro">PLAY</div>
          </button>
          <button className="botaoAcao secundario" onClick={() => navigate('/inventario')}>
            <span className="iconeBotao">🧟‍♂️</span>
            <span>INVENTÁRIO</span>
            <div className="subBotaoEscuro">VER AGORA</div>
          </button>
        </div>
      </section>

      <section className="secaoInformacoes">
        <article className="cartaoInfo">
          <div className="iconeVideo">▶</div>
          <div className="textoInfo">
            <h4>Sobre a série - The Walking Dead</h4>
            <p>Após acordar de um coma, o policial Rick Grimes descobre que o mundo foi destruído por um apocalipse zumbi...</p>
          </div>
        </article>
        
        <article className="cartaoInfo invertido">
          <div className="textoInfo">
            <h4>Sobre a plataforma</h4>
            <p>Plataforma para encontrar os personagens perdidos da série dentro do SENAI Roberto Mange...</p>
          </div>
          <div className="iconeVideo">?</div>
        </article>
      </section>

      <footer className="cabecalhoLogo">
        <h1>TWD</h1>
      </footer>
    </main>
  );
};

export default Home;