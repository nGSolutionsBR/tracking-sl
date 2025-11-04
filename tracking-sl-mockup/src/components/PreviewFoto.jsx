import { useState, useEffect } from 'react'
import './PreviewFoto.css'

// Estados de validação mockados
const VALIDACAO_ESTADOS = {
  sucesso: {
    foco: { status: 'ok', mensagem: 'Foco: OK' },
    iluminacao: { status: 'ok', mensagem: 'Iluminação: OK' },
    resolucao: { status: 'ok', mensagem: 'Resolução: OK' },
    mensagemGeral: 'Foto aprovada! Todos os critérios atendidos.',
    tipo: 'sucesso'
  },
  alerta: {
    foco: { status: 'ok', mensagem: 'Foco: OK' },
    iluminacao: { status: 'alerta', mensagem: 'Iluminação: Foto pode estar escura' },
    resolucao: { status: 'ok', mensagem: 'Resolução: OK' },
    mensagemGeral: 'Atenção: A foto pode ter problemas de iluminação. Deseja refazer?',
    tipo: 'alerta'
  },
  bloqueio: {
    foco: { status: 'erro', mensagem: 'Foco: Muito desfocada' },
    iluminacao: { status: 'alerta', mensagem: 'Iluminação: Muito escura' },
    resolucao: { status: 'ok', mensagem: 'Resolução: OK' },
    mensagemGeral: 'Foto muito desfocada. É necessário tirar novamente.',
    tipo: 'bloqueio',
    dicas: ['Limpe a lente da câmera', 'Mantenha o celular firme', 'Use o flash em ambientes escuros']
  }
}

function PreviewFoto({ passoTitulo = "Portão de Entrada", estadoValidacao = "sucesso", onConfirmar, onRefazer, onBack }) {
  const [validacoes, setValidacoes] = useState(null)
  const [mostrandoValidacoes, setMostrandoValidacoes] = useState(false)

  const validacao = VALIDACAO_ESTADOS[estadoValidacao] || VALIDACAO_ESTADOS.sucesso

  useEffect(() => {
    // Simular validação progressiva
    setTimeout(() => {
      setValidacoes({
        foco: validacao.foco
      })
    }, 300)

    setTimeout(() => {
      setValidacoes(prev => ({
        ...prev,
        iluminacao: validacao.iluminacao
      }))
    }, 600)

    setTimeout(() => {
      setValidacoes(prev => ({
        ...prev,
        resolucao: validacao.resolucao
      }))
      setMostrandoValidacoes(true)
    }, 900)
  }, [estadoValidacao])

  const getIconeStatus = (status) => {
    switch (status) {
      case 'ok':
        return '✓'
      case 'alerta':
        return '⚠'
      case 'erro':
        return '✕'
      default:
        return '○'
    }
  }

  const getClasseStatus = (status) => {
    switch (status) {
      case 'ok':
        return 'validacao-ok'
      case 'alerta':
        return 'validacao-alerta'
      case 'erro':
        return 'validacao-erro'
      default:
        return ''
    }
  }

  return (
    <div className="preview-foto-page">
      {/* Header */}
      <div className="header-passo">
        <button className="header-back" onClick={onBack}>
          ←
        </button>
        <div className="header-info">
          <span className="passo-numero">Preview da Foto</span>
        </div>
        <div style={{ width: '44px' }}></div>
      </div>

      {/* Conteúdo */}
      <div className="content-preview">
        {/* Preview da foto mockada */}
        <div className="preview-container">
          <div className="preview-image">
            <div className="mock-foto">
              <div className="foto-icon">🚪</div>
              <p className="foto-label">Foto capturada</p>
              <p className="foto-subtitle">{passoTitulo}</p>
            </div>
          </div>
        </div>

        {/* Validações automáticas */}
        <div className="validacoes-container">
          <h3 className="validacoes-titulo">Validações Automáticas:</h3>

          <div className="validacoes-lista">
            {/* Validação de foco */}
            <div className={`validacao-item-preview ${validacoes?.foco ? 'validacao-visivel' : ''}`}>
              <span className={`validacao-icon-preview ${validacoes?.foco ? getClasseStatus(validacao.foco.status) : ''}`}>
                {validacoes?.foco ? getIconeStatus(validacao.foco.status) : '○'}
              </span>
              <span className="validacao-label-preview">
                {validacao.foco.mensagem}
              </span>
            </div>

            {/* Validação de iluminação */}
            <div className={`validacao-item-preview ${validacoes?.iluminacao ? 'validacao-visivel' : ''}`}>
              <span className={`validacao-icon-preview ${validacoes?.iluminacao ? getClasseStatus(validacao.iluminacao.status) : ''}`}>
                {validacoes?.iluminacao ? getIconeStatus(validacao.iluminacao.status) : '○'}
              </span>
              <span className="validacao-label-preview">
                {validacao.iluminacao.mensagem}
              </span>
            </div>

            {/* Validação de resolução */}
            <div className={`validacao-item-preview ${validacoes?.resolucao ? 'validacao-visivel' : ''}`}>
              <span className={`validacao-icon-preview ${validacoes?.resolucao ? getClasseStatus(validacao.resolucao.status) : ''}`}>
                {validacoes?.resolucao ? getIconeStatus(validacao.resolucao.status) : '○'}
              </span>
              <span className="validacao-label-preview">
                {validacao.resolucao.mensagem}
              </span>
            </div>
          </div>
        </div>

        {/* Mensagem contextual */}
        {mostrandoValidacoes && (
          <div className={`mensagem-contextual mensagem-${validacao.tipo}`}>
            <div className="mensagem-icone">
              {validacao.tipo === 'sucesso' && '✓'}
              {validacao.tipo === 'alerta' && '⚠'}
              {validacao.tipo === 'bloqueio' && '✕'}
            </div>
            <p className="mensagem-texto">{validacao.mensagemGeral}</p>
          </div>
        )}

        {/* Dicas de melhoria (apenas no bloqueio) */}
        {mostrandoValidacoes && validacao.tipo === 'bloqueio' && validacao.dicas && (
          <div className="dicas-melhoria">
            <h4 className="dicas-titulo">Dicas para melhorar:</h4>
            <ul className="dicas-lista-preview">
              {validacao.dicas.map((dica, index) => (
                <li key={index} className="dica-item-preview">
                  <span className="dica-bullet">•</span>
                  <span className="dica-texto-preview">{dica}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Rodapé com ações condicionais */}
      {mostrandoValidacoes && (
        <div className="footer-fixed-preview">
          {validacao.tipo === 'sucesso' && (
            <>
              <button className="btn-primary" onClick={onConfirmar}>
                CONFIRMAR E AVANÇAR
              </button>
              <button className="btn-secondary-preview" onClick={onRefazer}>
                Tirar Novamente
              </button>
            </>
          )}

          {validacao.tipo === 'alerta' && (
            <>
              <button className="btn-primary" onClick={onRefazer}>
                TIRAR NOVAMENTE
              </button>
              <button className="btn-secondary-preview" onClick={onConfirmar}>
                Manter Assim
              </button>
            </>
          )}

          {validacao.tipo === 'bloqueio' && (
            <button className="btn-primary" onClick={onRefazer}>
              TIRAR NOVAMENTE
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default PreviewFoto
