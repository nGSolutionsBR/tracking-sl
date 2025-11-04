import './SplashScreen.css'

function SplashScreen() {
  return (
    <div className="splash-screen">
      <div className="splash-content">
        <div className="logo-container">
          {/* Logo NG Solutions - símbolo ng com ponto laranja */}
          <div className="ng-logo">
            <span className="ng-text">ng</span>
            <span className="ng-dot"></span>
          </div>
        </div>
        <h1 className="product-name">Trackin<span className="g-uppercase">G</span> SI</h1>
        <p className="product-subtitle">by NG Solutions</p>
      </div>
    </div>
  )
}

export default SplashScreen
