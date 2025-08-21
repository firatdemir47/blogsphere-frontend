import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navigation from '../component/Navigation'
import { categories as predefinedCategories } from '../data/categories'

export default function Write() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [category, setCategory] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [categories, setCategories] = useState([])
  const [loadingCategories, setLoadingCategories] = useState(true)

  useEffect(() => {
    // Use the same categories as the Categories page
    const names = predefinedCategories.map(c => c.name)
    setCategories(names)
    setLoadingCategories(false)
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('http://localhost:3000/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, author, category })
      })
      if (!res.ok) throw new Error('Kaydetme başarısız')
      const created = await res.json()
      navigate(`/blog/${created.id}`)
    } catch (err) {
      setError(err.message || 'Bir hata oluştu')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Navigation />
      <div className="write-page" style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
        <h1 style={{ marginBottom: 12 }}>✍️ Yeni Yazı</h1>
        {error && <p className="error" style={{ color: 'tomato', marginBottom: 12 }}>{error}</p>}
        <form onSubmit={handleSubmit} className="write-form" style={{ display: 'grid', gap: 12 }}>
          <input
            className="input"
            placeholder="Başlık"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            className="input"
            placeholder="Yazar"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          {loadingCategories ? (
            <select className="input" disabled>
              <option>Kategoriler yükleniyor...</option>
            </select>
          ) : categories.length > 0 ? (
            <select
              className="input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>Bir kategori seçin</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          ) : (
            <select className="input" disabled>
              <option>Kategori bulunamadı</option>
            </select>
          )}
          <textarea
            className="textarea"
            placeholder="İçerik"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={12}
            required
          />
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button type="button" className="cta-secondary" onClick={() => navigate(-1)} disabled={submitting}>Vazgeç</button>
            <button type="submit" className="read-btn" disabled={submitting}>
              {submitting ? 'Kaydediliyor...' : 'Yayınla'}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}


