import React from 'react';
import './style.css';

const ModalDesbloqueio = ({ personagem, aoFechar }) => {
  return (
    <div className="sobreposicaoModal">
      <div className="conteudoModal">
        <button className="botaoFecharModal" onClick={aoFechar}>X</button>
        <h2>PARABÉNS!!</h2>
        <p>Parabéns você desbloqueou mais um personagem para te ajudar nessa aventura!</p>
        
        <div className="avatarDesbloqueado">
          <img src={personagem.imagem} alt={personagem.personagem} />
        </div>
        
        <div className="caixaFraseModal">
          "{personagem.frase}"
        </div>
      </div>
    </div>
  );
};

export default ModalDesbloqueio;