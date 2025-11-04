import './VistoriasList.css'

function VistoriasList({ vistorias, onSelectVistoria }) {
  const getTipoBadgeClass = (tipo) => {
    switch (tipo) {
      case 'normal':
        return 'badge-normal'
      case 'comercial':
        return 'badge-comercial'
      case 'noturna':
        return 'badge-noturna'
      default:
        return 'badge-normal'
    }
  }

  const getTipoLabel = (tipo) => {
    switch (tipo) {
      case 'normal':
        return 'Normal'
      case 'comercial':
        return 'Horário Comercial'
      case 'noturna':
        return 'Noturna'
      default:
        return tipo
    }
  }

  const getStatusIcon = (status) => {
    if (status === true) return '✓'
    if (status === false) return '✗'
    return '—'
  }

  const getStatusClass = (status) => {
    if (status === true) return 'status-ok'
    if (status === false) return 'status-nok'
    return 'status-na'
  }

  const isVistoriaDisponivel = (vistoria) => {
    return vistoria.status !== 'bloqueada'
  }

  return (
    <div className="vistorias-list">
      {/* Header fixo */}
      <div className="header">
        <div className="header-logo">
          <div className="ng-logo-small">
            <span className="ng-text-small">ng</span>
            <span className="ng-dot-small"></span>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="content-area">
        <div className="page-header">
          <h1 className="page-title">Vistorias Disponíveis</h1>
          <p className="page-subtitle">Equipe Delta - {vistorias.filter(v => v.status !== 'bloqueada').length} pendências</p>
        </div>

        <div className="vistorias-cards">
          {vistorias.map((vistoria) => (
            <div
              key={vistoria.id}
              className={`vistoria-card ${!isVistoriaDisponivel(vistoria) ? 'card-bloqueada' : ''}`}
              onClick={() => onSelectVistoria(vistoria)}
            >
              {/* Cabeçalho do card */}
              <div className="card-header">
                <h3 className="vistoria-codigo">{vistoria.codigo}</h3>
                <span className={`badge ${getTipoBadgeClass(vistoria.tipo)}`}>
                  {getTipoLabel(vistoria.tipo)}
                </span>
              </div>

              {/* Local */}
              <p className="vistoria-local">{vistoria.local}</p>

              {/* Pré-requisitos */}
              <div className="pre-requisitos">
                <div className="pre-requisito-item">
                  <span className="pre-requisito-label">Chaves:</span>
                  <span className={`pre-requisito-status ${getStatusClass(vistoria.chaves)}`}>
                    {getStatusIcon(vistoria.chaves)} {vistoria.chaves === true ? 'OK' : vistoria.chaves === false ? 'NOK' : 'N/A'}
                  </span>
                </div>
                <div className="pre-requisito-item">
                  <span className="pre-requisito-label">Autorização:</span>
                  <span className={`pre-requisito-status ${getStatusClass(vistoria.autorizacao)}`}>
                    {getStatusIcon(vistoria.autorizacao)} {vistoria.autorizacao === true ? 'OK' : vistoria.autorizacao === false ? 'NOK' : 'N/A'}
                  </span>
                </div>
              </div>

              {/* Observação */}
              {vistoria.observacao && (
                <p className="vistoria-observacao">
                  <em>{vistoria.observacao}</em>
                </p>
              )}

              {/* Botão de ação */}
              <button
                className={`btn-primary ${!isVistoriaDisponivel(vistoria) ? 'btn-bloqueado' : ''}`}
                disabled={!isVistoriaDisponivel(vistoria)}
              >
                {isVistoriaDisponivel(vistoria) ? 'INICIAR VISTORIA' : 'AGUARDANDO'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VistoriasList
