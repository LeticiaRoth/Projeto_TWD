import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContextoJogo } from '../../context/ContextoJogo';
import { locaisJogo } from '../../data/dadosJogo';
import './style.css';

const Inventario = () => {
  const { personagensDesbloqueados, podio, atualizarPodio } = useContext(ContextoJogo);
  const navigate = useNavigate();

  const lidarComDragStart = (e, idPersonagem) => {
    e.dataTransfer.setData("idPersonagem", idPersonagem);
  };

  const lidarComDragOver = (e) => {
    e.preventDefault(); 
  };

  const lidarComDrop = (e, posicaoPodio) => {
    e.preventDefault();
    const idPersonagem = parseInt(e.dataTransfer.getData("idPersonagem"));
    if (idPersonagem) {
      atualizarPodio(posicaoPodio, idPersonagem);
    }
  };

  const renderizarAvatar = (id, draggable = true) => {
    if (!id) return null;
    const personagem = locaisJogo.find(p => p.id === id);
    return (
      <img 
        src={personagem.imagem} 
        alt={personagem.personagem}
        draggable={draggable}
        onDragStart={(e) => draggable && lidarComDragStart(e, id)}
        className="avatarInventario"
      />
    );
  };

  return (
    <main className="telaInventario">
      <header className="cabecalhoInventario">
        <h2>INVENTÁRIO DO SOBREVIVENTE</h2>
        <p>Responda as perguntas da sua jornada e garanta um novo personagem para se juntar a você!</p>
      </header>

      <button className="botaoVoltar" onClick={() => navigate('/mapa')}>⬅ MAPA</button>

      <section className="containerInventario">
        
        <div className="areaPodio">
          <h3>Pódio</h3>
          <p>Arraste seus personagens favoritos para o pódio!</p>
          <div className="posicoesPodio">
            <div 
              className="slotPodio prata" 
              onDragOver={lidarComDragOver} 
              onDrop={(e) => lidarComDrop(e, 'segundo')}
            >
              {renderizarAvatar(podio.segundo, false)}
              <span>2º Lugar</span>
            </div>
            <div 
              className="slotPodio ouro" 
              onDragOver={lidarComDragOver} 
              onDrop={(e) => lidarComDrop(e, 'primeiro')}
            >
              {renderizarAvatar(podio.primeiro, false)}
              <span>1º Lugar</span>
            </div>
            <div 
              className="slotPodio bronze" 
              onDragOver={lidarComDragOver} 
              onDrop={(e) => lidarComDrop(e, 'terceiro')}
            >
              {renderizarAvatar(podio.terceiro, false)}
              <span>3º Lugar</span>
            </div>
          </div>
        </div>

        {/* Lista de Personagens (Draggables) */}
        <div className="gradePersonagens">
          {locaisJogo.map(local => {
            const desbloqueado = personagensDesbloqueados.includes(local.id);
            const noPodio = Object.values(podio).includes(local.id);

            return (
              <div 
                key={local.id} 
                className={`slotPersonagem ${desbloqueado ? 'ativo' : 'bloqueado'} ${noPodio ? 'usado' : ''}`}
              >
                {desbloqueado ? (
                  renderizarAvatar(local.id, !noPodio)
                ) : (
                  <div className="silhuetaCadeado">🔒</div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <footer className="cabecalhoLogo"><h1>TWD</h1></footer>
    </main>
  );
};

export default Inventario;