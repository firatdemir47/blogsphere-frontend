import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navigation from '../component/Navigation'
import { categories as predefinedCategories } from '../data/categories'

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null)

  const categories = predefinedCategories

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
