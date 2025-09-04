import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Results from './pages/Results.jsx'
import Home from './pages/Home.jsx'
import Review from './pages/Review.jsx'
import Admin from './pages/Admin.jsx'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/quiz/:subject', element: <App /> },
  { path: '/results', element: <Results /> },
  { path: '/review', element: <Review /> },
  { path: '/admin', element: <Admin /> },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
