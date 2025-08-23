import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navigation from '../component/Navigation'
import { categories as predefinedCategories } from '../data/categories'

export default function CategoryDetail() {
  const { categoryName } = useParams()
  const navigate = useNavigate()
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState(null)

  useEffect(() => {
    // Kategori bilgisini bul
    const foundCategory = predefinedCategories.find(cat => cat.name === categoryName)
    if (foundCategory) {
      setCategory(foundCategory)
    }

    // Bu kategorideki blogları çek
    fetch('http://localhost:3000/api/blogs')
      .then((res) => res.json())
      .then((data) => {
        // API'den gelen veri yapısını kontrol et ve düzelt
        if (data && data.success && Array.isArray(data.data)) {
          // API'den gelen veriyi dönüştür
          const transformedBlogs = data.data.map(blog => ({
            id: blog.id,
            title: blog.title,
            content: blog.content,
            author: blog.author_name,
            category: blog.category_name,
            createdAt: blog.created_at,
            updatedAt: blog.updated_at
          }));
          const filteredBlogs = transformedBlogs.filter(blog => blog.category === categoryName)
          setBlogs(filteredBlogs)
        } else if (Array.isArray(data)) {
          const filteredBlogs = data.filter(blog => blog.category === categoryName)
          setBlogs(filteredBlogs)
        } else {
          console.error("API'den beklenmeyen veri formatı:", data);
          setBlogs([])
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error('Blogları çekerken hata:', err)
        setBlogs([])
        setLoading(false)
      })
  }, [categoryName])

  if (!category) {
    return (
      <>
        <Navigation />
        <div className="category-detail-page">
          <div className="error-message">
            <h1>Kategori Bulunamadı</h1>
            <p>"{categoryName}" kategorisi mevcut değil.</p>
            <button onClick={() => navigate('/categories')} className="back-btn">
              Kategorilere Dön
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navigation />
      <div className="category-detail-page">
        <div className="category-header">
          <div className="category-info">
            <div className="category-icon">{category.icon}</div>
            <div>
              <h1>{category.name}</h1>
              <p>{category.description}</p>
            </div>
          </div>
          <button onClick={() => navigate('/categories')} className="back-btn">
            ← Kategorilere Dön
          </button>
        </div>

        <div className="category-stats">
          <span className="blog-count">{blogs.length} yazı bulundu</span>
        </div>

        {loading ? (
          <div className="loading">
            <p>Yazılar yükleniyor...</p>
          </div>
        ) : !Array.isArray(blogs) || blogs.length === 0 ? (
          <div className="empty-state">
            <p>Bu kategoride henüz yazı bulunmuyor.</p>
            <button onClick={() => navigate('/write')} className="write-btn">
              İlk Yazıyı Yaz
            </button>
          </div>
        ) : (
          <div className="blogs-grid">
            {blogs.map((blog) => (
              <article key={blog.id} className="blog-card">
                <div className="blog-content">
                  <h3 className="blog-title">{blog.title}</h3>
                  <p className="blog-excerpt">
                    {blog.content.length > 150 
                      ? `${blog.content.substring(0, 150)}...` 
                      : blog.content
                    }
                  </p>
                  <div className="blog-meta">
                    <span className="blog-author">Yazar: {blog.author}</span>
                    {blog.createdAt && (
                      <time className="blog-date">
                        {new Date(blog.createdAt).toLocaleDateString('tr-TR')}
                      </time>
                    )}
                  </div>
                  <button 
                    onClick={() => navigate(`/blog/${blog.id}`)}
                    className="read-more-btn"
                  >
                    Devamını Oku →
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
