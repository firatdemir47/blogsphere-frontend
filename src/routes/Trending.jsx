import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navigation from '../component/Navigation'

export default function Trending() {
  const [trendingBlogs, setTrendingBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate trending blogs (in real app, this would be an API call)
    setTimeout(() => {
      setTrendingBlogs([
        {
          id: 1,
          title: "React 19'da Yeni Özellikler",
          author: "Ahmet Yılmaz",
          category: "Teknoloji",
          views: 15420,
          likes: 892,
          createdAt: "2024-01-15"
        },
        {
          id: 2,
          title: "Modern Web Tasarım Trendleri 2024",
          author: "Zeynep Kaya",
          category: "Tasarım",
          views: 12850,
          likes: 756,
          createdAt: "2024-01-14"
        },
        {
          id: 3,
          title: "Yapay Zeka ve Geleceğimiz",
          author: "Mehmet Demir",
          category: "Bilim",
          views: 9870,
          likes: 634,
          createdAt: "2024-01-13"
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="trending-page">
          <div className="trending-header">
            <h1>🔥 Trend Yazılar</h1>
            <p>En popüler ve güncel içerikler</p>
          </div>
          <div className="trending-grid">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="trending-card skeleton">
                <div className="skeleton-title" />
                <div className="skeleton-body" />
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navigation />
      <div className="trending-page">
        <div className="trending-header">
          <h1>🔥 Trend Yazılar</h1>
          <p>En popüler ve güncel içerikler</p>
        </div>
        
        <div className="trending-grid">
          {trendingBlogs.map((blog, index) => (
            <div key={blog.id} className="trending-card">
              <div className="trending-rank">#{index + 1}</div>
              <div className="trending-content">
                <h3 className="trending-title">{blog.title}</h3>
                <div className="trending-meta">
                  <span className="trending-author">{blog.author}</span>
                  <span className="trending-category">{blog.category}</span>
                </div>
                <div className="trending-stats">
                  <span className="trending-views">👁️ {blog.views.toLocaleString()}</span>
                  <span className="trending-likes">❤️ {blog.likes.toLocaleString()}</span>
                </div>
                <Link to={`/blog/${blog.id}`} className="trending-link">
                  Oku →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="trending-info">
          <h3>Trend Yazılar Nasıl Belirlenir?</h3>
          <p>Trend yazılar, okunma sayısı, beğeni sayısı, paylaşım oranı ve güncellik gibi faktörlere göre belirlenir. Bu sayfada en popüler içerikleri bulabilirsiniz.</p>
        </div>
      </div>
    </>
  )
}
