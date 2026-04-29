import React from "react";
import { useNavigate } from "react-router-dom";
import Carrossel from "../../components/Carrossel/Carrossel";
import "./style.css";

// Imagens e ícones do assets
import gameImagem from "../../assets/image/gameImagem.png";
import zumbiImagem from "../../assets/image/zumbiImagen.png";
import imagemTV from "../../assets/image/imagemTV.png";
import imagemInterrogacao from "../../assets/image/imagemInterrogacao.png";

// Imagens do Carrossel
import imagem1 from "../../assets/imagensCarrossel/imagem1.jpg";
import imagem2 from "../../assets/imagensCarrossel/imagem2.jpg";
import imagem3 from "../../assets/imagensCarrossel/imagem3.jpg";
import imagem4 from "../../assets/imagensCarrossel/imagem4.jpg";
import imagem5 from "../../assets/imagensCarrossel/imagem5.jpg";
import imagem6 from "../../assets/imagensCarrossel/imagem6.jpg";

// Imagem logo Footer
import logo from "../../assets/image/logo1.svg";

const imagensBanner = [
  { src: imagem1, alt: "Imagem do Negan com o seu taco de beisebol" },
  { src: imagem2, alt: "Imagem de perto de todo o grupo de sobreviventes" },
  { src: imagem3, alt: "Imagem do Rick de perto com uma arma" },
  { src: imagem4, alt: "Imagem vermelha com detalhes em preto de zumbis" },
  {
    src: imagem5,
    alt: "Imagem do Negan e o Rick no confronto da sexta temporada",
  },
  {
    src: imagem6,
    alt: "Imagem do grupo de sobreviventes andando em uma rua deserta",
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Cabeçalho do Home */}
      <header className="cabecalhoHome">
        <h1 className="cabecalhoHomeTitulo">SEJA BEM-VINDO(A)!</h1>
        <p>
          Encontre todos os personagens de TWD que estão sobrevivendo no SENAI
          Roberto Mange.
        </p>
      </header>

      <main className="telaHome">
        {/* Carrossel */}
        <section
          className="secaoCarrosselDestaque"
          aria-label="Banners em destaque"
        >
          <Carrossel imagens={imagensBanner} />
        </section>

        <div className="conteudoHome">
          {/* Botões de ação do jogo de TWD e inventário */}
          <section className="secaoAcoes" aria-labelledby="tituloSelecione">
            <h2 id="tituloSelecione" className="secaoAcoesTitulo">
              SELECIONE
            </h2>

            <div
              className="botoesAcao"
              role="group"
              aria-label="Ações principais"
            >
              {/* Botão de "Começar Jogo" */}
              <button
                type="button"
                className="botaoAcao"
                onClick={() => navigate("/mapa")}
                aria-label="Começar jogo — ir para o mapa"
              >
                <img
                  src={gameImagem}
                  alt=""
                  className="imgIconeAcao"
                  aria-hidden="true"
                />
                <h3 className="botaoAcaoTitulo">COMEÇAR JOGO</h3>
                <div className="subBotaoEscuro" aria-hidden="true">
                  PLAY
                </div>
              </button>

              {/* Botão de "Inventário" */}
              <button
                type="button"
                className="botaoAcao"
                onClick={() => navigate("/inventario")}
                aria-label="Ver inventário"
              >
                <img
                  src={zumbiImagem}
                  alt=""
                  className="imgIconeAcao"
                  aria-hidden="true"
                />
                <h3 className="botaoAcaoTitulo">INVENTÁRIO</h3>
                <div className="subBotaoEscuro" aria-hidden="true">
                  VER AGORA
                </div>
              </button>
            </div>
          </section>

          {/* Section das informações da plataforma */}
          <section
            className="secaoInformacoes"
            aria-label="Informações sobre a série e a plataforma"
          >
            {/* Card 1 - Sobre a série */}
            <article className="cartaoInfo" aria-labelledby="tituloSerie">
              <div className="blocoImagemInfo" aria-hidden="true">
                <img src={imagemTV} alt="" className="imgInfo" />
              </div>
              <div className="textoInfo">
                <h2 id="tituloSerie" className="textoInfoTitulo">
                  Sobre a série — The Walking Dead
                </h2>
                <p>
                  Após acordar de um coma, o policial Rick Grimes descobre que o
                  mundo foi destruído por um apocalipse zumbi. Ao reencontrar
                  sua família, ele passa a liderar um grupo de sobreviventes na
                  luta por proteção e sobrevivência.
                </p>
              </div>
            </article>

            {/* Card 2 - Sobre a plataforma */}
            <article
              className="cartaoInfo invertido"
              aria-labelledby="tituloPlataforma"
            >
              <div className="textoInfo">
                <h2 id="tituloPlataforma" className="textoInfoTitulo">
                  Sobre a plataforma
                </h2>
                <p>
                  Plataforma de geolocalização para encontrar os personagens
                  perdidos da série dentro do SENAI Roberto Mange. Ao
                  encontrá-los, você descobrirá uma surpresa.
                </p>
              </div>
              <div className="blocoImagemInfo" aria-hidden="true">
                <img src={imagemInterrogacao} alt="" className="imgInfo" />
              </div>
            </article>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="cabecalhoLogo">
        <img src={logo} alt="The Walking Dead" className="logoRodape" />
      </footer>
    </>
  );
};

export default Home;
