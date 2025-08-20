import './App.css'
import BlogList from './component/BlogList'

function App() {
  return (
    <>
      <header className="app-header">
        <div className="brand">
          <span className="brand-badge">B</span>
          <h1 className="brand-title">BlogSphere</h1>
        </div>
        <p className="brand-subtitle">Topluluğumuzdan öne çıkan yazılar</p>
      </header>

      <main>
        <BlogList />
      </main>
    </>
  )
}

export default App
