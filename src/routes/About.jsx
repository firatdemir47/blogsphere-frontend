import Navigation from '../component/Navigation'

export default function About() {
  return (
    <>
      <Navigation />
      <div className="about-page">
        <div className="about-header">
          <h1>ℹ️ Hakkımızda</h1>
          <p>BlogSphere'i tanıyın</p>
        </div>

        <div className="about-content">
          <section className="about-section">
            <h2>Biz Kimiz?</h2>
            <p>
              BlogSphere, düşüncelerini paylaşmak ve bilgi alışverişinde bulunmak isteyen 
              herkes için tasarlanmış modern bir blog platformudur. Amacımız, yazarların 
              seslerini duyurabileceği, okuyucuların ise kaliteli içeriklerle buluşabileceği 
              bir topluluk oluşturmaktır.
            </p>
          </section>

          <section className="about-section">
            <h2>Misyonumuz</h2>
            <p>
              Bilgi paylaşımını kolaylaştırmak, yaratıcılığı desteklemek ve insanları 
              birbirine bağlayan anlamlı içerikler üretmek. Herkesin kendi hikayesini 
              anlatabileceği, farklı perspektiflerden öğrenebileceği bir platform olmak.
            </p>
          </section>

          <section className="about-section">
            <h2>Değerlerimiz</h2>
            <div className="values-grid">
              <div className="value-item">
                <div className="value-icon">🤝</div>
                <h3>Topluluk</h3>
                <p>Birlikte öğrenir, birlikte büyürüz</p>
              </div>
              <div className="value-item">
                <div className="value-icon">💡</div>
                <h3>Yaratıcılık</h3>
                <p>Yeni fikirleri destekler ve teşvik ederiz</p>
              </div>
              <div className="value-item">
                <div className="value-icon">🔒</div>
                <h3>Güvenlik</h3>
                <p>Kullanıcı gizliliğini ve güvenliğini ön planda tutarız</p>
              </div>
              <div className="value-item">
                <div className="value-icon">🌍</div>
                <h3>Çeşitlilik</h3>
                <p>Farklı kültürlerden ve bakış açılarından öğreniriz</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Özelliklerimiz</h2>
            <div className="features-list">
              <div className="feature-item">
                <span className="feature-icon">📝</span>
                <div className="feature-content">
                  <h4>Kolay Yazım</h4>
                  <p>Markdown desteği ile hızlı ve güzel yazılar oluşturun</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🎨</span>
                <div className="feature-content">
                  <h4>Özelleştirilebilir Tasarım</h4>
                  <p>Kendi tarzınıza uygun temalar ve düzenler</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">📊</span>
                <div className="feature-content">
                  <h4>Analitik</h4>
                  <p>Yazılarınızın performansını takip edin</p>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🔗</span>
                <div className="feature-content">
                  <h4>Sosyal Paylaşım</h4>
                  <p>Yazılarınızı sosyal medyada kolayca paylaşın</p>
                </div>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>İletişim</h2>
            <p>
              Sorularınız, önerileriniz veya geri bildirimleriniz için bizimle iletişime geçebilirsiniz:
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <span>info@blogsphere.com</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">🐦</span>
                <span>@BlogSphere</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📱</span>
                <span>+90 (212) 555-0123</span>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Katkıda Bulunun</h2>
            <p>
              BlogSphere açık kaynak bir projedir ve topluluk katkılarına açıktır. 
              Kod, tasarım, dokümantasyon veya fikir önerilerinizle projeye katkıda bulunabilirsiniz.
            </p>
            <div className="cta-buttons">
              <button className="cta-primary">GitHub'da Katkıda Bulun</button>
              <button className="cta-secondary">Topluluk Forumu</button>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
