import { useState, useEffect } from 'react'
import './App.css'
import SplashScreen from './components/SplashScreen'
import VistoriasList from './components/VistoriasList'
import QuestionarioEPI from './components/QuestionarioEPI'
import SelfiePage from './components/SelfiePage'
import CheckIn from './components/CheckIn'
import VisaoGeralSequencia from './components/VisaoGeralSequencia'
import PassoVistoria from './components/PassoVistoria'
import PreviewFoto from './components/PreviewFoto'
import ProgressoVistoria from './components/ProgressoVistoria'

// DADOS MOCKADOS - Estrutura de vistorias
const mockVistorias = [
  {
    id: 1,
    codigo: "VST-2024-089",
    local: "Torre Greenfield - Av. Paulista, 1500",
    tipo: "normal",
    chaves: true,
    autorizacao: null,
    observacao: null,
    status: "disponivel"
  },
  {
    id: 2,
    codigo: "VST-2024-090",
    local: "Rooftop Comercial - Rua Augusta, 234",
    tipo: "comercial",
    chaves: true,
    autorizacao: true,
    observacao: "Acessar entre 8h-18h",
    status: "disponivel"
  },
  {
    id: 3,
    codigo: "VST-2024-091",
    local: "Torre Rural - Estrada Velha, Km 45",
    tipo: "noturna",
    chaves: false,
    autorizacao: false,
    observacao: "Aguardando chave e autorização do proprietário",
    status: "bloqueada"
  }
]

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash')
  const [vistorias, setVistorias] = useState(mockVistorias)
  const [selectedVistoria, setSelectedVistoria] = useState(null)
  const [passoAtual, setPassoAtual] = useState(1)

  // Splash screen com timer de 3 segundos
  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('list')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [currentScreen])

  const handleSelectVistoria = (vistoria) => {
    if (vistoria.status === 'bloqueada') {
      alert('Vistoria indisponível: aguardando pré-requisitos')
      return
    }
    setSelectedVistoria(vistoria)
    setCurrentScreen('questionario')
  }

  const handleQuestionarioComplete = () => {
    setCurrentScreen('selfie')
  }

  const handleSelfieConfirm = () => {
    // Avançar para check-in
    setCurrentScreen('checkin')
  }

  const handleCheckInComplete = () => {
    // Avançar para visão geral da sequência
    setCurrentScreen('visao-geral')
  }

  const handleIniciarVistoria = () => {
    // Iniciar primeiro passo
    setPassoAtual(1)
    setCurrentScreen('passo-vistoria')
  }

  const handleCapturarFoto = () => {
    // Ir para preview da foto
    setCurrentScreen('preview-foto')
  }

  const handleConfirmarFoto = () => {
    // Avançar para próximo passo
    const proximoPasso = passoAtual + 1
    setPassoAtual(proximoPasso)

    // A cada 8 passos, mostrar tela de progresso
    if (proximoPasso % 8 === 0) {
      setCurrentScreen('progresso')
    } else {
      setCurrentScreen('passo-vistoria')
    }
  }

  const handleRefazerFoto = () => {
    // Voltar para captura
    setCurrentScreen('passo-vistoria')
  }

  const handleContinuarVistoria = () => {
    // Voltar para próximo passo
    setCurrentScreen('passo-vistoria')
  }

  const handlePausarVistoria = () => {
    // Atualizar status da vistoria para "em andamento"
    setVistorias(prev => prev.map(v =>
      v.id === selectedVistoria.id
        ? { ...v, status: 'em_andamento' }
        : v
    ))
    // Voltar para lista
    setCurrentScreen('list')
    setSelectedVistoria(null)
    setPassoAtual(1)
  }

  const handleNaoSeAplica = () => {
    // Avançar para próximo passo
    const proximoPasso = passoAtual + 1
    setPassoAtual(proximoPasso)
    setCurrentScreen('passo-vistoria')
  }

  const handleBack = () => {
    if (currentScreen === 'preview-foto') {
      setCurrentScreen('passo-vistoria')
    } else if (currentScreen === 'passo-vistoria') {
      setCurrentScreen('visao-geral')
    } else if (currentScreen === 'visao-geral') {
      setCurrentScreen('checkin')
    } else if (currentScreen === 'checkin') {
      setCurrentScreen('selfie')
    } else if (currentScreen === 'selfie') {
      setCurrentScreen('questionario')
    } else if (currentScreen === 'questionario') {
      setCurrentScreen('list')
      setSelectedVistoria(null)
    } else if (currentScreen === 'progresso') {
      setCurrentScreen('visao-geral')
    }
  }

  const handleMenuPasso = () => {
    // Simular menu de opções (pausar, sair, etc)
    const opcao = confirm('Deseja pausar a vistoria?')
    if (opcao) {
      handlePausarVistoria()
    }
  }

  const handleVerTodasFotos = () => {
    alert('Funcionalidade de galeria completa - mockup')
  }

  return (
    <div className="app-container">
      {currentScreen === 'splash' && <SplashScreen />}
      {currentScreen === 'list' && (
        <VistoriasList
          vistorias={vistorias}
          onSelectVistoria={handleSelectVistoria}
        />
      )}
      {currentScreen === 'questionario' && (
        <QuestionarioEPI
          onComplete={handleQuestionarioComplete}
          onBack={handleBack}
        />
      )}
      {currentScreen === 'selfie' && (
        <SelfiePage
          onConfirm={handleSelfieConfirm}
          onBack={handleBack}
        />
      )}
      {currentScreen === 'checkin' && (
        <CheckIn
          vistoria={selectedVistoria}
          onCheckInComplete={handleCheckInComplete}
          onBack={handleBack}
        />
      )}
      {currentScreen === 'visao-geral' && (
        <VisaoGeralSequencia
          vistoria={selectedVistoria}
          onIniciarVistoria={handleIniciarVistoria}
          onPausar={handlePausarVistoria}
        />
      )}
      {currentScreen === 'passo-vistoria' && (
        <PassoVistoria
          passoAtual={passoAtual}
          onCapturar={handleCapturarFoto}
          onNaoSeAplica={handleNaoSeAplica}
          onBack={handleBack}
          onMenu={handleMenuPasso}
        />
      )}
      {currentScreen === 'preview-foto' && (
        <PreviewFoto
          passoTitulo="Portão de Entrada"
          estadoValidacao="sucesso"
          onConfirmar={handleConfirmarFoto}
          onRefazer={handleRefazerFoto}
          onBack={handleBack}
        />
      )}
      {currentScreen === 'progresso' && (
        <ProgressoVistoria
          onContinuar={handleContinuarVistoria}
          onPausar={handlePausarVistoria}
          onVerTodasFotos={handleVerTodasFotos}
        />
      )}
    </div>
  )
}

export default App
