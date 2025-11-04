import { useState } from 'react'
import './PassoVistoria.css'

// DADOS MOCKADOS - Exemplos de passos
const PASSOS_MOCKADOS = [
  {
    numero: 1,
    total: 67,
    titulo: "Selfie de Chegada",
    instrucao: "Tire uma selfie mostrando você no local com equipamentos de segurança",
    icone: "🤳",
    checklist: [
      "Rosto visível",
      "Capacete e EPIs",
      "Local ao fundo",
      "Boa iluminação"
    ],
    dica: "Posicione-se de forma que o site apareça ao fundo",
    tipo: "foto"
  },
  {
    numero: 2,
    total: 67,
    titulo: "Placa de Identificação",
    instrucao: "Fotografe a placa de identificação do site mostrando código e informações",
    icone: "🏷",
    checklist: [
      "Código do site legível",
      "Texto nítido",
      "Placa completa",
      "Sem reflexos"
    ],
    dica: "Se houver reflexo, ajuste o ângulo da câmera",
    tipo: "foto"
  },
  {
    numero: 3,
    total: 67,
    titulo: "Portão de Entrada",
    instrucao: "Tire uma foto frontal do portão mostrando tipo de fechamento e condições de acesso",
    icone: "🚪",
    checklist: [
      "Tipo de portão (grade, chapa, etc)",
      "Sistema de fechadura",
      "Condições gerais",
      "Placa de identificação se houver"
    ],
    dica: "Se o portão estiver contra a luz, ajuste o ângulo",
    tipo: "foto"
  },
  {
    numero: 4,
    total: 67,
    titulo: "Vista da Rua",
    instrucao: "Fotografe a vista geral da rua mostrando localização e acesso ao site",
    icone: "🛣",
    checklist: [
      "Visão geral da rua",
      "Referências de localização",
      "Condições de acesso",
      "Sinalização visível"
    ],
    dica: "Capture referências importantes como placas de rua",
    tipo: "foto"
  }
]

function PassoVistoria({ passoAtual = 3, onCapturar, onNaoSeAplica, onBack, onMenu }) {
  const passo = PASSOS_MOCKADOS[passoAtual - 1] || PASSOS_MOCKADOS[2]
  const [showExemplo, setShowExemplo] = useState(false)
  const [showObservacao, setShowObservacao] = useState(false)
  const [observacaoTexto, setObservacaoTexto] = useState('')
  const [flashAtivo, setFlashAtivo] = useState(false)

  const handleCapturar = () => {
    // Efeito de flash
    setFlashAtivo(true)
    setTimeout(() => {
      setFlashAtivo(false)
      onCapturar()
    }, 300)
  }

  const handleSalvarObservacao = () => {
    if (observacaoTexto.trim()) {
      // Simular salvamento
      console.log('Observação salva:', observacaoTexto)
      setObservacaoTexto('')
      setShowObservacao(false)

      // Mostrar feedback
      const toast = document.createElement('div')
      toast.className = 'toast-info'
      toast.textContent = 'Observação adicionada'
      document.body.appendChild(toast)

      setTimeout(() => {
        document.body.removeChild(toast)
      }, 2000)
    }
  }

  return (
    <div className="passo-vistoria-page">
      {/* Header compacto */}
      <div className="header-passo">
        <button className="header-back" onClick={onBack}>
          ←
        </button>
        <div className="header-info">
          <span className="passo-numero">Passo {passo.numero} de {passo.total}</span>
        </div>
        <button className="header-menu" onClick={onMenu}>
          ⋮
        </button>
      </div>

      {/* Barra de progresso fino */}
      <div className="progresso-fino">
        <div
          className="progresso-fino-preenchimento"
          style={{ width: `${(passo.numero / passo.total) * 100}%` }}
        ></div>
      </div>

      {/* Flash effect */}
      {flashAtivo && <div className="flash-effect-camera"></div>}

      {/* Conteúdo scrollável */}
      <div className="content-passo">
        {/* Área de instrução */}
        <div className="instrucao-area">
          <div className="instrucao-icone">{passo.icone}</div>
          <h1 className="instrucao-titulo">{passo.titulo}</h1>
          <p className="instrucao-texto">{passo.instrucao}</p>
        </div>

        {/* Checklist */}
        <div className="checklist-card">
          <h3 className="checklist-titulo">O que incluir:</h3>
          <ul className="checklist-lista">
            {passo.checklist.map((item, index) => (
              <li key={index} className="checklist-item">
                <span className="checklist-icon">✓</span>
                <span className="checklist-texto">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Dica contextual */}
        {passo.dica && (
          <div className="dica-card">
            <span className="dica-icone">💡</span>
            <p className="dica-texto">{passo.dica}</p>
          </div>
        )}

        {/* Link ver exemplo */}
        <button className="btn-link" onClick={() => setShowExemplo(true)}>
          Ver foto de exemplo
        </button>

        {/* Preview da câmera simulado */}
        <div className="camera-preview-area">
          <div className="camera-frame-passo">
            <div className="camera-placeholder-passo">
              <div className="placeholder-icon-camera">📷</div>
              <p className="placeholder-text-camera">Posicione o {passo.titulo.toLowerCase()} no centro</p>

              {/* Grid de enquadramento */}
              <div className="camera-grid">
                <div className="grid-line grid-v1"></div>
                <div className="grid-line grid-v2"></div>
                <div className="grid-line grid-h1"></div>
                <div className="grid-line grid-h2"></div>
              </div>
            </div>
          </div>

          {/* Controles de câmera */}
          <div className="camera-controls">
            <button className="control-btn">
              <span className="control-icon">⚡</span>
              <span className="control-label">Flash</span>
            </button>
            <button className="control-btn">
              <span className="control-icon">☀</span>
              <span className="control-label">Brilho</span>
            </button>
          </div>
        </div>
      </div>

      {/* Rodapé fixo com ações */}
      <div className="footer-passo">
        <div className="footer-actions-secundarias">
          <button className="btn-link-small" onClick={onNaoSeAplica}>
            Não se aplica
          </button>
          <button className="btn-link-small" onClick={() => setShowObservacao(true)}>
            Adicionar observação
          </button>
        </div>

        <button className="btn-captura" onClick={handleCapturar}>
          <span className="captura-icon">📸</span>
        </button>
      </div>

      {/* Modal de exemplo */}
      {showExemplo && (
        <div className="modal-overlay" onClick={() => setShowExemplo(false)}>
          <div className="modal-content modal-exemplo" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-exemplo">
              <h3>Foto de Exemplo</h3>
              <button className="btn-fechar" onClick={() => setShowExemplo(false)}>
                ×
              </button>
            </div>
            <div className="exemplo-imagem">
              <div className="mock-exemplo-foto">
                <span className="exemplo-icone">{passo.icone}</span>
                <p className="exemplo-label">Exemplo de {passo.titulo}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de observação */}
      {showObservacao && (
        <div className="modal-overlay" onClick={() => setShowObservacao(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Adicionar Observação</h2>
            </div>
            <div className="modal-body">
              <textarea
                className="observacao-textarea"
                placeholder="Digite sua observação sobre este passo..."
                value={observacaoTexto}
                onChange={(e) => setObservacaoTexto(e.target.value)}
                rows="4"
                autoFocus
              />
            </div>
            <div className="modal-actions">
              <button
                className="btn-secondary"
                onClick={() => {
                  setShowObservacao(false)
                  setObservacaoTexto('')
                }}
              >
                CANCELAR
              </button>
              <button
                className="btn-primary"
                onClick={handleSalvarObservacao}
                disabled={!observacaoTexto.trim()}
              >
                SALVAR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PassoVistoria
