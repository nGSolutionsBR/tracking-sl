import { useState, useEffect } from 'react'
import './App.css'
import SplashScreen from './components/SplashScreen'
import VistoriasList from './components/VistoriasList'
import QuestionarioEPI from './components/QuestionarioEPI'
import SelfiePage from './components/SelfiePage'

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
    // Atualizar status da vistoria para "em andamento"
    setVistorias(prev => prev.map(v =>
      v.id === selectedVistoria.id
        ? { ...v, status: 'em_andamento' }
        : v
    ))
    alert('Vistoria iniciada com sucesso!')
    setCurrentScreen('list')
    setSelectedVistoria(null)
  }

  const handleBack = () => {
    if (currentScreen === 'selfie') {
      setCurrentScreen('questionario')
    } else if (currentScreen === 'questionario') {
      setCurrentScreen('list')
      setSelectedVistoria(null)
    }
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
    </div>
  )
}

export default App
