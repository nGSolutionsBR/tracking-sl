import { useState } from 'react'
import './ProgressoVistoria.css'

// DADOS MOCKADOS - Progresso simulado
const MOCK_PROGRESSO = {
  passosCompletos: 24,
  totalPassos: 67,
  tempoDecorrido: 45, // minutos
  fotosCapturadas: 24,
  secoes: [
    { nome: "Chegada e Segurança", completos: 7, total: 7, status: "completo" },
    { nome: "Visão Geral do Site", completos: 8, total: 8, status: "completo" },
    { nome: "Energia AC", completos: 9, total: 18, status: "andamento" },
    { nome: "Gabinetes", completos: 0, total: 30, status: "pendente" },
    { nome: "Esteiras", completos: 0, total: 10, status: "pendente" },
    { nome: "RF e Antenas", completos: 0, total: 40, status: "pendente" },
    { nome: "Estrutura Geral", completos: 0, total: 12, status: "pendente" },
    { nome: "Finalização", completos: 0, total: 3, status: "pendente" }
  ],
  observacoes: [
    { passo: 12, texto: "Medidor apresenta oxidação", timestamp: "14:23" },
    { passo: 18, texto: "Gabinete A sem espaço para novos equipamentos", timestamp: "14:45" }
  ],
  ultimasFotos: [
    { id: 1, titulo: "Selfie Chegada", thumbnail: "🤳" },
    { id: 2, titulo: "Placa Site", thumbnail: "🏷" },
    { id: 3, titulo: "Portão Entrada", thumbnail: "🚪" },
    { id: 4, titulo: "Vista Rua", thumbnail: "🛣" },
    { id: 5, titulo: "Painel Frontal", thumbnail: "⚡" },
    { id: 6, titulo: "Medidor Principal", thumbnail: "📊" },
    { id: 7, titulo: "Quadro Energia", thumbnail: "🔌" },
    { id: 8, titulo: "Disjuntores", thumbnail: "🔲" },
    { id: 9, titulo: "Aterramento", thumbnail: "⚡" }
  ]
}

function ProgressoVistoria({ onContinuar, onPausar, onVerTodasFotos }) {
  const [showPausarModal, setShowPausarModal] = useState(false)
  const [fotoSelecionada, setFotoSelecionada] = useState(null)

  const percentualCompleto = Math.round(
    (MOCK_PROGRESSO.passosCompletos / MOCK_PROGRESSO.totalPassos) * 100
  )

  const formatarTempo = (minutos) => {
    const horas = Math.floor(minutos / 60)
    const mins = minutos % 60
    if (horas > 0) {
      return `${horas}h ${mins}min`
    }
    return `${mins} minutos`
  }

  const handlePausar = () => {
    setShowPausarModal(true)
  }

  const handleConfirmarPausa = () => {
    setShowPausarModal(false)
    onPausar()
  }

  const handleClickFoto = (foto) => {
    setFotoSelecionada(foto)
  }

  return (
    <div className="progresso-vistoria-page">
      {/* Header */}
      <div className="header-vistoria">
        <div className="header-logo">
          <div className="logo-symbol">
            <span className="logo-ng">ng</span>
            <span className="logo-dot">•</span>
          </div>
          <div className="logo-text">TrackinG SI</div>
        </div>
        <div className="header-status">Em Andamento</div>
      </div>

      {/* Conteúdo */}
      <div className="content-area-progresso">
        {/* Resumo visual destacado */}
        <div className="resumo-card">
          <h2 className="resumo-titulo">Resumo da Vistoria</h2>

          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-valor">{MOCK_PROGRESSO.passosCompletos}/{MOCK_PROGRESSO.totalPassos}</div>
              <div className="stat-label">Passos</div>
            </div>
            <div className="stat-item">
              <div className="stat-valor">{percentualCompleto}%</div>
              <div className="stat-label">Completo</div>
            </div>
            <div className="stat-item">
              <div className="stat-valor">{formatarTempo(MOCK_PROGRESSO.tempoDecorrido)}</div>
              <div className="stat-label">Decorrido</div>
            </div>
            <div className="stat-item">
              <div className="stat-valor">{MOCK_PROGRESSO.fotosCapturadas}</div>
              <div className="stat-label">Fotos</div>
            </div>
          </div>

          {/* Barra de progresso */}
          <div className="progresso-barra-grande">
            <div
              className="progresso-preenchimento-grande"
              style={{ width: `${percentualCompleto}%` }}
            ></div>
          </div>
        </div>

        {/* Seções concluídas */}
        <div className="secoes-progresso-card">
          <h3 className="secoes-progresso-titulo">Progresso por Seção</h3>

          <div className="secoes-progresso-lista">
            {MOCK_PROGRESSO.secoes.map((secao, index) => (
              <div key={index} className={`secao-progresso-item secao-${secao.status}`}>
                <div className="secao-progresso-icone">
                  {secao.status === 'completo' && '✓'}
                  {secao.status === 'andamento' && '⏳'}
                  {secao.status === 'pendente' && '○'}
                </div>
                <div className="secao-progresso-info">
                  <div className="secao-progresso-nome">{secao.nome}</div>
                  <div className="secao-progresso-stats">
                    {secao.completos}/{secao.total} passos
                  </div>
                </div>
                <div className="secao-progresso-barra-mini">
                  <div
                    className="secao-progresso-preenchimento-mini"
                    style={{ width: `${(secao.completos / secao.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Últimas fotos capturadas */}
        <div className="fotos-card">
          <div className="fotos-header">
            <h3 className="fotos-titulo">Últimas Fotos</h3>
            <button className="btn-ver-todas" onClick={onVerTodasFotos}>
              Ver Todas
            </button>
          </div>

          <div className="fotos-grid">
            {MOCK_PROGRESSO.ultimasFotos.map((foto) => (
              <div
                key={foto.id}
                className="foto-thumbnail"
                onClick={() => handleClickFoto(foto)}
              >
                <div className="thumbnail-icone">{foto.thumbnail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Observações registradas */}
        <div className="observacoes-card">
          <h3 className="observacoes-titulo">Observações Registradas</h3>

          {MOCK_PROGRESSO.observacoes.length > 0 ? (
            <div className="observacoes-lista">
              {MOCK_PROGRESSO.observacoes.map((obs, index) => (
                <div key={index} className="observacao-item">
                  <div className="observacao-header">
                    <span className="observacao-passo">Passo {obs.passo}</span>
                    <span className="observacao-timestamp">{obs.timestamp}</span>
                  </div>
                  <p className="observacao-texto">{obs.texto}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="observacoes-vazio">Nenhuma observação registrada até o momento</p>
          )}
        </div>
      </div>

      {/* Rodapé fixo */}
      <div className="footer-fixed-progresso">
        <button className="btn-primary" onClick={onContinuar}>
          CONTINUAR VISTORIA
        </button>
        <button className="btn-pausar-progresso" onClick={handlePausar}>
          Pausar
        </button>
      </div>

      {/* Modal de confirmação de pausa */}
      {showPausarModal && (
        <div className="modal-overlay" onClick={() => setShowPausarModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-icon warning">⏸</div>
              <h2 className="modal-title">Pausar Vistoria?</h2>
            </div>
            <div className="modal-body">
              <p>Você poderá retomar esta vistoria posteriormente.</p>
              <p>Todo o progresso ({percentualCompleto}%) será salvo.</p>
            </div>
            <div className="modal-actions">
              <button
                className="btn-secondary"
                onClick={() => setShowPausarModal(false)}
              >
                CANCELAR
              </button>
              <button
                className="btn-primary"
                onClick={handleConfirmarPausa}
              >
                SIM, PAUSAR
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de visualização de foto */}
      {fotoSelecionada && (
        <div className="modal-overlay" onClick={() => setFotoSelecionada(null)}>
          <div className="modal-content modal-foto-ampliada" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-foto">
              <h3>{fotoSelecionada.titulo}</h3>
              <button className="btn-fechar-foto" onClick={() => setFotoSelecionada(null)}>
                ×
              </button>
            </div>
            <div className="foto-ampliada">
              <div className="foto-ampliada-mock">
                <span className="foto-ampliada-icone">{fotoSelecionada.thumbnail}</span>
                <p className="foto-ampliada-label">{fotoSelecionada.titulo}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProgressoVistoria
