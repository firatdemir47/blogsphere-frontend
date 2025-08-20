import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navigation from '../component/Navigation'

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null)

  const categories = [
    {
      name: "Teknoloji",
      description: "Yazılım, donanım ve dijital dünya hakkında her şey",
      icon: "💻",
      count: 45,
      color: "#3b82f6"
    },
    {
      name: "Bilim",
      description: "Bilimsel araştırmalar ve keşifler",
      icon: "🔬",
      count: 32,
      color: "#10b981"
    },
    {
      name: "Tasarım",
      description: "UI/UX, grafik tasarım ve yaratıcılık",
      icon: "🎨",
      count: 28,
      color: "#f59e0b"
    },
    {
      name: "İş Dünyası",
      description: "Girişimcilik, pazarlama ve iş stratejileri",
      icon: "💼",
      count: 23,
      color: "#8b5cf6"
    },
    {
      name: "Sağlık",
      description: "Fitness, beslenme ve mental sağlık",
      icon: "🏥",
      count: 19,
      color: "#ef4444"
    },
    {
      name: "Eğitim",
      description: "Öğrenme teknikleri ve eğitim sistemleri",
      icon: "📚",
      count: 26,
      color: "#06b6d4"
    },
    {
      name: "Sanat",
      description: "Müzik, sinema, edebiyat ve görsel sanatlar",
      icon: "🎭",
      count: 21,
      color: "#ec4899"
    },
    {
      name: "Seyahat",
      description: "Gezi rehberleri ve kültür",
      icon: "✈️",
      count: 15,
      color: "#84cc16"
    }
  ]

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
                  <span className="category-count">{category.count} yazı</span>
                  <Link to={`/?category=${category.name}`} className="category-link">
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
