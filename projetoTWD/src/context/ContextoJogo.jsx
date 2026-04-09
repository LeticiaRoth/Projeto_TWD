import React, { createContext, useState, useEffect } from 'react';

export const ContextoJogo = createContext();

export const ProvedorJogo = ({ children }) => {
  const [faseAtual, setFaseAtual] = useState(() => {
    const faseSalva = localStorage.getItem('twd_faseAtual');
    return faseSalva ? parseInt(faseSalva) : 1;
  });

  const [personagensDesbloqueados, setPersonagensDesbloqueados] = useState(() => {
    const salvos = localStorage.getItem('twd_desbloqueados');
    return salvos ? JSON.parse(salvos) : [];
  });

  const [podio, setPodio] = useState(() => {
    const podioSalvo = localStorage.getItem('twd_podio');
    return podioSalvo ? JSON.parse(podioSalvo) : { primeiro: null, segundo: null, terceiro: null };
  });

  useEffect(() => {
    localStorage.setItem('twd_faseAtual', faseAtual);
    localStorage.setItem('twd_desbloqueados', JSON.stringify(personagensDesbloqueados));
    localStorage.setItem('twd_podio', JSON.stringify(podio));
  }, [faseAtual, personagensDesbloqueados, podio]);

  const desbloquearPersonagem = (id) => {
    if (!personagensDesbloqueados.includes(id)) {
      setPersonagensDesbloqueados([...personagensDesbloqueados, id]);
      setFaseAtual(faseAtual + 1);
    }
  };

  const atualizarPodio = (posicao, personagemId) => {
    setPodio((prev) => ({ ...prev, [posicao]: personagemId }));
  };

  return (
    <ContextoJogo.Provider value={{ 
      faseAtual, 
      personagensDesbloqueados, 
      desbloquearPersonagem,
      podio,
      atualizarPodio
    }}>
      {children}
    </ContextoJogo.Provider>
  );
};