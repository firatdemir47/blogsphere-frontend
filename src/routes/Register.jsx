import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navigation from '../component/Navigation'

export default function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Şifre kontrolü
    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.name,
          email: formData.email,
          password: formData.password,
          firstName: formData.name.split(' ')[0] || formData.name,
          lastName: formData.name.split(' ').slice(1).join(' ') || ''
        })
      })

      const data = await response.json()

      if (response.ok) {
        // Başarılı kayıt sonrası login sayfasına yönlendir
        navigate('/login', { 
          state: { message: 'Kayıt başarılı! Şimdi giriş yapabilirsiniz.' }
        })
      } else {
        setError(data.message || 'Kayıt başarısız')
      }
    } catch (err) {
      setError('Bağlantı hatası oluştu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navigation />
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-header">
            <h1>📝 Kayıt Ol</h1>
            <p>BlogSphere'e katılmak için hesap oluşturun</p>
          </div>

          {error && (
            <div className="error-message">
              <span>❌ {error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="name">Ad Soyad</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="auth-input"
                placeholder="Adınız ve soyadınız"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">E-posta</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="auth-input"
                placeholder="ornek@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Şifre</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="auth-input"
                placeholder="••••••••"
                minLength="6"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Şifre Tekrar</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="auth-input"
                placeholder="••••••••"
                minLength="6"
              />
            </div>

            <button 
              type="submit" 
              className="auth-button"
              disabled={loading}
            >
              {loading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Zaten hesabınız var mı?{' '}
              <Link to="/login" className="auth-link">
                Giriş yap
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
