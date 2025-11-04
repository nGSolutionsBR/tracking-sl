import { useState } from 'react'
import './SelfiePage.css'

function SelfiePage({ onConfirm, onBack }) {
  const [fotoCapturada, setFotoCapturada] = useState(false)
  const [validacoes, setValidacoes] = useState({
    rosto: false,
    capacete: false,
    iluminacao: false
  })

  const handleCapturarFoto = () => {
    // Simular captura de foto com efeito flash
    const flashElement = document.querySelector('.flash-effect')
    if (flashElement) {
      flashElement.classList.add('flash-active')
      setTimeout(() => {
        flashElement.classList.remove('flash-active')
      }, 300)
    }

    // Simular validações após 500ms
    setTimeout(() => {
      setFotoCapturada(true)
      setValidacoes({
        rosto: true,
        capacete: true,
        iluminacao: true
      })
    }, 500)
  }

  const handleRefazer = () => {
    setFotoCapturada(false)
    setValidacoes({
      rosto: false,
      capacete: false,
      iluminacao: false
    })
  }

  return (
    <div className="selfie-page">
      {/* Header */}
      <div className="header">
        <button className="header-back" onClick={onBack}>
          ←
        </button>
        <div className="header-title">Verificação de Presença</div>
        <div style={{ width: '44px' }}></div>
      </div>

      {/* Flash effect */}
      <div className="flash-effect"></div>

      {/* Conteúdo */}
      <div className="content-area">
        <div className="selfie-header">
          <h1 className="selfie-title">Tire uma selfie com seu EPI</h1>
          <p className="selfie-subtitle">Certifique-se que seu rosto e equipamentos estão visíveis</p>
        </div>

        {/* Área de captura */}
        <div className="camera-area">
          {!fotoCapturada ? (
            <div className="camera-frame">
              <div className="camera-placeholder">
                <div className="placeholder-icon">📷</div>
                <p className="placeholder-text">Posicione seu rosto no centro</p>
                <div className="frame-guides">
                  <div className="guide top-left"></div>
                  <div className="guide top-right"></div>
                  <div className="guide bottom-left"></div>
                  <div className="guide bottom-right"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="photo-preview">
              <div className="preview-image">
                <div className="mock-selfie">
                  <div className="selfie-icon">👷</div>
                  <p className="selfie-label">Foto capturada</p>
                </div>
              </div>

              {/* Validações */}
              <div className="validacoes">
                <h3 className="validacoes-title">Validações:</h3>
                <div className="validacao-item">
                  <span className={`validacao-icon ${validacoes.rosto ? 'validacao-ok' : ''}`}>
                    {validacoes.rosto ? '✓' : '○'}
                  </span>
                  <span className="validacao-label">Rosto detectado</span>
                </div>
                <div className="validacao-item">
                  <span className={`validacao-icon ${validacoes.capacete ? 'validacao-ok' : ''}`}>
                    {validacoes.capacete ? '✓' : '○'}
                  </span>
                  <span className="validacao-label">Capacete detectado</span>
                </div>
                <div className="validacao-item">
                  <span className={`validacao-icon ${validacoes.iluminacao ? 'validacao-ok' : ''}`}>
                    {validacoes.iluminacao ? '✓' : '○'}
                  </span>
                  <span className="validacao-label">Iluminação adequada</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dicas */}
        {!fotoCapturada && (
          <div className="dicas">
            <h3 className="dicas-title">Dicas:</h3>
            <ul className="dicas-list">
              <li>Certifique-se de estar em um local bem iluminado</li>
              <li>Mantenha o capacete visível</li>
              <li>Olhe diretamente para a câmera</li>
            </ul>
          </div>
        )}
      </div>

      {/* Rodapé */}
      <div className="footer-fixed">
        {!fotoCapturada ? (
          <button className="btn-primary btn-camera" onClick={handleCapturarFoto}>
            <span className="camera-icon">📸</span>
            TIRAR FOTO
          </button>
        ) : (
          <div className="preview-actions">
            <button className="btn-secondary" onClick={handleRefazer}>
              REFAZER
            </button>
            <button className="btn-primary" onClick={onConfirm}>
              CONFIRMAR E AVANÇAR
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SelfiePage
