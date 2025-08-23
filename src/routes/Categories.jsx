import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navigation from '../component/Navigation'
import { categories as predefinedCategories } from '../data/categories'

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  const categories = predefinedCategories

  // Blog verilerini çek ve kategori sayılarını hesapla
  useEffect(() => {
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
          setBlogs(transformedBlogs);
        } else if (Array.isArray(data)) {
          setBlogs(data);
        } else {
          console.error("API'den beklenmeyen veri formatı:", data);
          setBlogs([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Blogları çekerken hata:', err)
        setBlogs([]);
        setLoading(false);
      })
  }, [])

  // Her kategorideki yazı sayısını hesapla
  const getCategoryCount = (categoryName) => {
    // blogs array olduğundan emin ol
    if (!Array.isArray(blogs)) {
      return 0;
    }
    return blogs.filter(blog => blog.category === categoryName).length
  }

  const filteredCategories = selectedCategory 
    ? categories.filter(cat => cat.name.toLowerCase().includes(selectedCategory.toLowerCase()))
    : categories

  return (
    <>
      <Navigation />
      <div className="categories-page">
        <div className="categories-header">
          <h1>📚 Kategoriler</h1>
          <p>İlgi alanınıza göre yazıları keşfedin</p>
          
          <div className="categories-search">
            <input
              type="text"
              placeholder="Kategori ara..."
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="category-search-input"
            />
          </div>
        </div>

        <div className="categories-grid">
          {filteredCategories.map((category) => (
            <div key={category.name} className="category-card" style={{ '--category-color': category.color }}>
              <div className="category-icon">{category.icon}</div>
              <div className="category-content">
                <h3 className="category-name">{category.name}</h3>
                <p className="category-description">{category.description}</p>
                <div className="category-footer">
                  <span className="category-count">
                    {loading ? '...' : `${getCategoryCount(category.name)} yazı`}
                  </span>
                  <Link to={`/category/${encodeURIComponent(category.name)}`} className="category-link">
                    Görüntüle →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="no-results">
            <p>"{selectedCategory}" ile eşleşen kategori bulunamadı.</p>
            <button 
              onClick={() => setSelectedCategory('')}
              className="clear-search-btn"
            >
              Aramayı temizle
            </button>
          </div>
        )}

        <div className="categories-info">
          <h3>Kategoriler Hakkında</h3>
          <p>Her kategori, belirli bir konu etrafında toplanan yazıları içerir. Kategorilere göz atarak ilgi alanınıza uygun içerikleri kolayca bulabilirsiniz.</p>
        </div>
      </div>
    </>
  )
}
