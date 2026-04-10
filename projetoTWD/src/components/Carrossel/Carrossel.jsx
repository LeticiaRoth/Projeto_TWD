import React, { useState, useEffect } from 'react';
import './Carrossel.css';

const Carrossel = ({ imagens }) => {
  const [indiceAtual, setIndiceAtual] = useState(0);

  // Efeito para trocar a imagem automaticamente a cada 3 segundos
  useEffect(() => {
    if (!imagens || imagens.length === 0) return;
    
    const intervalo = setInterval(() => {
      setIndiceAtual((prevIndice) => 
        prevIndice === imagens.length - 1 ? 0 : prevIndice + 1
      );
    }, 3000);

    return () => clearInterval(intervalo);
  }, [imagens]);

  if (!imagens || imagens.length === 0) return null;

  return (
    <div className="carrosselContainer">
      {imagens.map((imagem, index) => (
        <div 
          key={index} 
          className={`slide ${index === indiceAtual ? 'ativo' : ''}`}
        >
          {index === indiceAtual && (
            <img src={imagem.src} alt={imagem.alt} className="imagemCarrossel" />
          )}
        </div>
      ))}
      
      <div className="indicadoresCarrossel">
        {imagens.map((_, index) => (
          <span 
            key={index} 
            className={`bolinha ${index === indiceAtual ? 'ativa' : ''}`}
            onClick={() => setIndiceAtual(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carrossel;