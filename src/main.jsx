import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import BlogDetail from './routes/BlogDetail.jsx'
import Trending from './routes/Trending.jsx'
import Categories from './routes/Categories.jsx'
import CategoryDetail from './routes/CategoryDetail.jsx'
import About from './routes/About.jsx'
import Write from './routes/Write.jsx'
import Login from './routes/Login.jsx'
import Register from './routes/Register.jsx'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/blog/:id', element: <BlogDetail /> },
  { path: '/trending', element: <Trending /> },
  { path: '/categories', element: <Categories /> },
  { path: '/category/:categoryName', element: <CategoryDetail /> },
  { path: '/about', element: <About /> },
  { path: '/write', element: <Write /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
