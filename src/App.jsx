import './App.css'
import Navigation from './component/Navigation'
import BlogList from './component/BlogList'

function App() {
  return (
    <>
      <Navigation />
      <main className="main-content">
        <div className="hero-section">
          <h1 className="hero-title">BlogSphere'e Hoş Geldiniz</h1>
          <p className="hero-subtitle">Düşüncelerini paylaş, dünyayı keşfet</p>
        </div>
        <BlogList />
      </main>
    </>
  )
}

export default App
