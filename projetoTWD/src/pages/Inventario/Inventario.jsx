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
        <p>Responda as perguntas da sua jornada e garanta um novo personagem para se juntar a você nessa jornada!</p>
      </header>

      <div className="containerBotao">
        <button className="botaoVoltar" onClick={() => navigate('/mapa')}>⬅ MAPA</button>
      </div>

      <section className="containerInventario">
        
        <div className="areaPodio">
          <h3>Pódio</h3>
          <p>Arraste seus personagens favoritos para o pódio!</p>
          <div className="posicoesPodio">
            <div className="slotPodio prata" onDragOver={lidarComDragOver} onDrop={(e) => lidarComDrop(e, 'segundo')}>
              <div className="circuloBase">{renderizarAvatar(podio.segundo, false)}</div>
              <span>2º Lugar</span>
            </div>
            <div className="slotPodio ouro" onDragOver={lidarComDragOver} onDrop={(e) => lidarComDrop(e, 'primeiro')}>
              <div className="circuloBase">{renderizarAvatar(podio.primeiro, false)}</div>
              <span>1º Lugar</span>
            </div>
            <div className="slotPodio bronze" onDragOver={lidarComDragOver} onDrop={(e) => lidarComDrop(e, 'terceiro')}>
              <div className="circuloBase">{renderizarAvatar(podio.terceiro, false)}</div>
              <span>3º Lugar</span>
            </div>
          </div>
        </div>

        {/* Lista de Personagens */}
        <div className="gradePersonagens">
          {locaisJogo.map((local, index) => {
            const desbloqueado = personagensDesbloqueados.includes(local.id);
            const noPodio = Object.values(podio).includes(local.id);
            
            const coresBorda = ['#666666', '#d67e7e', '#8ebcdb', '#5c5c5c', '#c19a6b', '#89959e'];
            const corAtual = coresBorda[index % coresBorda.length];

            return (
              <div 
                key={local.id} 
                className={`slotPersonagem ${desbloqueado ? 'ativo' : 'bloqueado'} ${noPodio ? 'usado' : ''}`}
                style={{ borderColor: corAtual }}
              >
                {/* Se estiver bloqueado, renderiza a imagem com filtro escuro + cadeado por cima */}
                <img 
                  src={local.imagem} 
                  alt="Avatar" 
                  className="imagemBasePersonagem"
                  draggable={desbloqueado && !noPodio}
                  onDragStart={(e) => desbloqueado && !noPodio && lidarComDragStart(e, local.id)}
                />
                {!desbloqueado && <div className="silhuetaCadeado">🔒</div>}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Inventario;