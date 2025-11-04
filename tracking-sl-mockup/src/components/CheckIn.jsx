import { useState } from 'react'
import './CheckIn.css'

// DADOS MOCKADOS - Coordenadas GPS
const MOCK_DATA = {
  site: {
    lat: -23.561684,
    lng: -46.655981,
    endereco: "Torre Greenfield - Av. Paulista, 1500"
  },
  usuario: {
    lat: -23.561720,
    lng: -46.656020,
    distancia: 45, // metros
    precisao: 8 // metros
  }
}

function CheckIn({ vistoria, onCheckInComplete, onBack }) {
  const [showDistantModal, setShowDistantModal] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // Simular estados diferentes de localização
  // Estado 1: Próximo (dentro de 200m) - default
  // Estado 2: Longe (>200m) - descomentar linha abaixo para testar
  // const [distancia] = useState(340)
  const [distancia] = useState(MOCK_DATA.usuario.distancia)

  const isWithinRange = distancia <= 200

  const handleConfirmCheckIn = () => {
    if (!isWithinRange) {
      setShowDistantModal(true)
      return
    }

    performCheckIn()
  }

  const handleForceCheckIn = () => {
    setShowDistantModal(false)
    performCheckIn()
  }

  const performCheckIn = () => {
    setIsProcessing(true)

    // Simular processamento
    setTimeout(() => {
      // Mostrar toast de sucesso
      const toast = document.createElement('div')
      toast.className = 'toast-success'
      toast.textContent = 'Check-in realizado com sucesso!'
      document.body.appendChild(toast)

      setTimeout(() => {
        document.body.removeChild(toast)
        onCheckInComplete()
      }, 2000)
    }, 1000)
  }

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="checkin-page">
      {/* Header */}
      <div className="header">
        <button className="header-back" onClick={onBack}>
          ←
        </button>
        <div className="header-title">Check-in no Local</div>
        <div style={{ width: '44px' }}></div>
      </div>

      {/* Conteúdo */}
      <div className="content-area">
        {/* Área do mapa simulado */}
        <div className="map-container">
          <div className="map-mock">
            {/* Pin do site */}
            <div className="map-pin pin-site">
              <div className="pin-icon">📡</div>
            </div>

            {/* Pin do usuário */}
            <div className="map-pin pin-user">
              <div className="pin-icon">📍</div>
            </div>

            {/* Linha conectando os dois pontos */}
            <svg className="connection-line" width="100%" height="100%">
              <line
                x1="30%"
                y1="40%"
                x2="70%"
                y2="60%"
                stroke={isWithinRange ? "#4caf50" : "#ffc107"}
                strokeWidth="2"
                strokeDasharray="5,5"
              />
            </svg>
          </div>
        </div>

        {/* Informações de validação */}
        <div className="validation-info">
          <div className={`validation-card ${isWithinRange ? 'validation-ok' : 'validation-warning'}`}>
            <div className="validation-icon">
              {isWithinRange ? '✓' : '⚠'}
            </div>
            <div className="validation-content">
              <div className="validation-main">
                Você está a <strong>{distancia}m</strong> do local
              </div>
              <div className="validation-status">
                {isWithinRange
                  ? 'Dentro do raio aceitável'
                  : 'Você está longe do site'
                }
              </div>
            </div>
          </div>

          <div className="precision-info">
            Precisão GPS: <strong>{MOCK_DATA.usuario.precisao}m</strong>
          </div>
        </div>

        {/* Dados do site */}
        <div className="site-info-card">
          <h3 className="site-info-title">Informações do Local</h3>

          <div className="info-row">
            <span className="info-icon">📍</span>
            <div className="info-content">
              <div className="info-label">Endereço</div>
              <div className="info-value">{MOCK_DATA.site.endereco}</div>
            </div>
          </div>

          <div className="info-row">
            <span className="info-icon">🌐</span>
            <div className="info-content">
              <div className="info-label">Coordenadas</div>
              <div className="info-value">
                {MOCK_DATA.site.lat}, {MOCK_DATA.site.lng}
              </div>
            </div>
          </div>

          <div className="info-row">
            <span className="info-icon">🕐</span>
            <div className="info-content">
              <div className="info-label">Horário</div>
              <div className="info-value">{getCurrentTime()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Rodapé fixo */}
      <div className="footer-fixed">
        <button
          className={`btn-primary ${isProcessing ? 'btn-processing' : ''}`}
          onClick={handleConfirmCheckIn}
          disabled={isProcessing}
        >
          {isProcessing ? 'PROCESSANDO...' : 'CONFIRMAR CHECK-IN'}
        </button>
        <p className="footer-text">Sua localização será registrada</p>
      </div>

      {/* Modal de confirmação para locais distantes */}
      {showDistantModal && (
        <div className="modal-overlay" onClick={() => setShowDistantModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-icon warning">⚠</div>
              <h2 className="modal-title">Você está longe do site</h2>
            </div>
            <div className="modal-body">
              <p>Você está a {distancia}m do local da vistoria.</p>
              <p>Deseja continuar mesmo assim?</p>
            </div>
            <div className="modal-actions">
              <button
                className="btn-secondary"
                onClick={() => setShowDistantModal(false)}
              >
                CANCELAR
              </button>
              <button
                className="btn-primary"
                onClick={handleForceCheckIn}
              >
                SIM, CONTINUAR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckIn
