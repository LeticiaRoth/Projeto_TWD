import React from "react";
import "./style.css";

const ModalDesbloqueio = ({ personagem, aoFechar }) => {
  return (
    <div className="sobreposicaoModal">
      <div className="conteudoModal">
        {/*Button de fechar */}
        <button className="botaoFecharModal" onClick={aoFechar}>
          X
        </button>
        {/*Frase - Título */}
        <h2>PARABÉNS!!</h2>
        <p>
          Parabéns você desbloqueou mais um personagem para te ajudar nessa
          aventura!
        </p>

        {/*Avatar desbloqueado */}
        <div className="avatarDesbloqueado">
          <img src={personagem.imagem} alt={personagem.personagem} />
        </div>

        {/*Frase dentro do modal */}
        <div className="caixaFraseModal">"{personagem.frase}"</div>
      </div>
    </div>
  );
};

export default ModalDesbloqueio;
