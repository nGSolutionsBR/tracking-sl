import { useState } from 'react'
import './QuestionarioEPI.css'

// DADOS MOCKADOS - EPIs para checklist
const episList = [
  { id: 1, nome: 'Capacete', icon: '🪖' },
  { id: 2, nome: 'Colete Refletivo', icon: '🦺' },
  { id: 3, nome: 'Botina de Segurança', icon: '👢' },
  { id: 4, nome: 'Óculos de Proteção', icon: '🥽' },
  { id: 5, nome: 'Luvas', icon: '🧤' },
  { id: 6, nome: 'Cinto de Segurança', icon: '🔗' }
]

function QuestionarioEPI({ onComplete, onBack }) {
  const [episSelecionados, setEpisSelecionados] = useState([])

  const handleToggleEPI = (epiId) => {
    setEpisSelecionados(prev => {
      if (prev.includes(epiId)) {
        return prev.filter(id => id !== epiId)
      } else {
        return [...prev, epiId]
      }
    })
  }

  const todosConfirmados = episSelecionados.length === episList.length

  return (
    <div className="questionario-epi">
      {/* Header com navegação */}
      <div className="header">
        <button className="header-back" onClick={onBack}>
          ←
        </button>
        <div className="header-title">Verificação de Segurança</div>
        <div style={{ width: '44px' }}></div>
      </div>

      {/* Conteúdo */}
      <div className="content-area">
        <div className="questionario-header">
          <div className="progress-indicator">Passo 1 de 1</div>
          <h1 className="questionario-title">Verificação de Segurança</h1>
          <p className="questionario-subtitle">Confirme que está com todos os EPIs</p>
        </div>

        <div className="epis-list">
          {episList.map((epi) => {
            const isSelected = episSelecionados.includes(epi.id)
            return (
              <div
                key={epi.id}
                className={`epi-item ${isSelected ? 'epi-selected' : ''}`}
                onClick={() => handleToggleEPI(epi.id)}
              >
                <div className="epi-icon">{epi.icon}</div>
                <div className="epi-info">
                  <span className="epi-nome">{epi.nome}</span>
                </div>
                <div className="epi-checkbox">
                  {isSelected && <span className="check-mark">✓</span>}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Rodapé fixo */}
      <div className="footer-fixed">
        <div className="contador">
          {episSelecionados.length} de {episList.length} itens confirmados
        </div>
        <button
          className="btn-primary"
          onClick={onComplete}
          disabled={!todosConfirmados}
        >
          CONTINUAR
        </button>
      </div>
    </div>
  )
}

export default QuestionarioEPI
