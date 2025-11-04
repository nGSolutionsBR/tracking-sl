import { useState } from 'react'
import './VisaoGeralSequencia.css'

// DADOS MOCKADOS - Seções da vistoria
const SECOES_VISTORIA = [
  {
    id: 1,
    nome: "Chegada e Segurança",
    icone: "⛑",
    totalPassos: 7,
    completos: 0,
    ativa: true
  },
  {
    id: 2,
    nome: "Visão Geral do Site",
    icone: "📷",
    totalPassos: 8,
    completos: 0,
    ativa: false
  },
  {
    id: 3,
    nome: "Energia AC",
    icone: "⚡",
    totalPassos: 18,
    completos: 0,
    ativa: false
  },
  {
    id: 4,
    nome: "Gabinetes",
    icone: "🗄",
    totalPassos: 30,
    completos: 0,
    ativa: false
  },
  {
    id: 5,
    nome: "Esteiras",
    icone: "🔌",
    totalPassos: 10,
    completos: 0,
    ativa: false
  },
  {
    id: 6,
    nome: "RF e Antenas",
    icone: "📡",
    totalPassos: 40,
    completos: 0,
    ativa: false
  },
  {
    id: 7,
    nome: "Estrutura Geral",
    icone: "🏗",
    totalPassos: 12,
    completos: 0,
    ativa: false
  },
  {
    id: 8,
    nome: "Finalização",
    icone: "✓",
    totalPassos: 3,
    completos: 0,
    ativa: false
  }
]

function VisaoGeralSequencia({ vistoria, onIniciarVistoria, onPausar }) {
  const [secoes] = useState(SECOES_VISTORIA)
  const [secaoExpandida, setSecaoExpandida] = useState(null)
  const [showPausarModal, setShowPausarModal] = useState(false)

  const totalPassos = secoes.reduce((acc, s) => acc + s.totalPassos, 0)
  const passosCompletos = secoes.reduce((acc, s) => acc + s.completos, 0)
  const percentualCompleto = 0 // Iniciando

  const handleToggleSecao = (secaoId) => {
    setSecaoExpandida(secaoExpandida === secaoId ? null : secaoId)
  }

  const handlePausar = () => {
    setShowPausarModal(true)
  }

  const handleConfirmarPausa = () => {
    setShowPausarModal(false)
    onPausar()
  }

  return (
    <div className="visao-geral-page">
      {/* Header */}
      <div className="header-vistoria">
        <div className="header-logo">
          <div className="logo-symbol">
            <span className="logo-ng">ng</span>
            <span className="logo-dot">•</span>
          </div>
          <div className="logo-text">TrackinG SI</div>
        </div>
        <div className="header-codigo">{vistoria.codigo}</div>
      </div>

      {/* Conteúdo */}
      <div className="content-area-vistoria">
        {/* Barra de progresso global */}
        <div className="progresso-global">
          <div className="progresso-header">
            <h2 className="progresso-title">Progresso da Vistoria</h2>
            <span className="progresso-percentual">{percentualCompleto}%</span>
          </div>
          <div className="progresso-info">
            <span className="progresso-texto">
              {passosCompletos} de {totalPassos} passos completos
            </span>
          </div>
          <div className="progresso-barra">
            <div
              className="progresso-preenchimento"
              style={{ width: `${percentualCompleto}%` }}
            ></div>
          </div>
        </div>

        {/* Cartão informativo do site */}
        <div className="site-info-card-vistoria">
          <div className="site-icon">📍</div>
          <div className="site-details">
            <h3 className="site-name">{vistoria.local}</h3>
            <div className="site-meta">
              <span className="site-meta-item">
                <span className="meta-icon">📋</span>
                Vistoria Completa
              </span>
              <span className="site-meta-item">
                <span className="meta-icon">⏱</span>
                90-150 minutos
              </span>
            </div>
          </div>
        </div>

        {/* Lista de seções */}
        <div className="secoes-container">
          <h3 className="secoes-title">Seções da Vistoria</h3>

          {secoes.map((secao, index) => (
            <div
              key={secao.id}
              className={`secao-item ${secao.ativa ? 'secao-ativa' : ''} ${
                secaoExpandida === secao.id ? 'secao-expandida' : ''
              }`}
            >
              <div
                className="secao-header"
                onClick={() => handleToggleSecao(secao.id)}
              >
                <div className="secao-numero">{index + 1}</div>
                <div className="secao-icone">{secao.icone}</div>
                <div className="secao-info">
                  <div className="secao-nome">{secao.nome}</div>
                  <div className="secao-passos">
                    {secao.completos > 0
                      ? `${secao.completos}/${secao.totalPassos} passos`
                      : `${secao.totalPassos} passos`
                    }
                  </div>
                </div>
                <div className="secao-status">
                  {secao.completos === secao.totalPassos && secao.completos > 0 ? (
                    <span className="status-icon completo">✓</span>
                  ) : secao.completos > 0 ? (
                    <span className="status-icon andamento">⏳</span>
                  ) : secao.ativa ? (
                    <span className="status-icon ativa">→</span>
                  ) : (
                    <span className="status-icon pendente">○</span>
                  )}
                </div>
              </div>

              {/* Conteúdo expandido (mockado) */}
              {secaoExpandida === secao.id && (
                <div className="secao-conteudo">
                  <p className="secao-descricao">
                    Esta seção contém {secao.totalPassos} passos de captura e validação.
                    Todos os passos serão guiados passo a passo.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Rodapé fixo */}
      <div className="footer-fixed-vistoria">
        <button className="btn-primary" onClick={onIniciarVistoria}>
          INICIAR PRIMEIRO PASSO
        </button>
        <button className="btn-pausar" onClick={handlePausar}>
          Pausar Vistoria
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
              <p>Todo o progresso será salvo.</p>
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
    </div>
  )
}

export default VisaoGeralSequencia
