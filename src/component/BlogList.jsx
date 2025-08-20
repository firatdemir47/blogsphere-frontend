import { useEffect, useState } from "react";
import Comments from "./Comments";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedBlogId, setExpandedBlogId] = useState(null);
  const [commentsMap, setCommentsMap] = useState({}); // { [blogId]: { loading, data } }
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    fetch("http://localhost:3000/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Blogları çekerken hata:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="blog-grid">
        {Array.from({ length: 4 }).map((_, i) => (
          <article key={i} className="blog-card skeleton">
            <div className="skeleton-title" />
            <div className="skeleton-body" />
            <div className="skeleton-footer" />
          </article>
        ))}
      </section>
    );
  }

  const categories = Array.from(
    new Set(
      blogs
        .map((b) => b.category)
        .filter((c) => typeof c === "string" && c.trim().length > 0)
    )
  );

  const normalizedQuery = query.trim().toLowerCase();
  const filtered = blogs.filter((b) => {
    const passesCategory = !selectedCategory || b.category === selectedCategory;
    if (!normalizedQuery) return passesCategory;
    const hay = `${b.title ?? ""} ${b.content ?? ""} ${b.author ?? ""}`.toLowerCase();
    return passesCategory && hay.includes(normalizedQuery);
  });

  const visibleBlogs = filtered.slice(0, visibleCount);

  const hueFromId = (id) => {
    const n = typeof id === "number" ? id : (String(id).split("").reduce((a, ch) => a + ch.charCodeAt(0), 0));
    return 180 + (n % 150);
  };

  return (
    <section>
      <div className="section-head">
        <h2>Bloglar</h2>
        <span className="count-badge">{filtered.length}</span>
      </div>

      <div className="controls">
        <input
          className="search-input"
          placeholder="Yazı ara... (başlık, içerik, yazar)"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setVisibleCount(6); }}
        />
        {categories.length > 0 && (
          <div className="chips">
            <button
              className={`chip${selectedCategory ? "" : " active"}`}
              onClick={() => setSelectedCategory(null)}
            >Tümü</button>
            {categories.map((c) => (
              <button
                key={c}
                className={`chip${selectedCategory === c ? " active" : ""}`}
                onClick={() => { setSelectedCategory(c === selectedCategory ? null : c); setVisibleCount(6); }}
              >{c}</button>
            ))}
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="empty">Hiç blog yok.</p>
      ) : (
        <div className="blog-grid">
          {visibleBlogs.map((blog, i) => (
            <article key={blog.id} className="blog-card" style={{ "--i": i, "--h": hueFromId(blog.id) }}>
              <button
                className="blog-card-click"
                onClick={() => {
                  const next = expandedBlogId === blog.id ? null : blog.id;
                  setExpandedBlogId(next);
                  if (next && !commentsMap[next]) {
                    // Lazy-load comments for this blog
                    setCommentsMap((m) => ({ ...m, [next]: { loading: true, data: [] } }));
                    fetch(`http://localhost:3000/api/blogs/${next}/comments`)
                      .then((r) => r.json())
                      .then((data) => setCommentsMap((m) => ({ ...m, [next]: { loading: false, data } })))
                      .catch(() => setCommentsMap((m) => ({ ...m, [next]: { loading: false, data: [] } })));
                  }
                }}
                aria-expanded={expandedBlogId === blog.id}
              >
                <div className="blog-cover" />
                <div className="blog-meta">
                  {blog.category && <span className="pill">{blog.category}</span>}
                  {blog.createdAt && (
                    <time className="date">{new Date(blog.createdAt).toLocaleDateString()}</time>
                  )}
                </div>
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-content blog-excerpt">{blog.content}</p>
                <div className="blog-footer">
                  <span className="blog-author">Yazar: {blog.author}</span>
                  <span className="read-btn" role="presentation">Oku</span>
                </div>
              </button>

              {expandedBlogId === blog.id && (
                <div className="comments-wrap">
                  <h4 className="comments-title">Yorumlar</h4>
                  <Comments
                    comments={commentsMap[blog.id]?.data}
                    loading={commentsMap[blog.id]?.loading}
                  />
                </div>
              )}
            </article>
          ))}
        </div>
      )}

      {filtered.length > visibleCount && (
        <div className="load-wrap">
          <button className="load-more" onClick={() => setVisibleCount((c) => c + 6)}>Daha fazla yükle</button>
        </div>
      )}
    </section>
  );
}
