import { Routes, Route } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Dashboard from './pages/dashboard/Dashboard'
import ProtectedRoute from './routes/ProtectedRoutes'
import Layout from './components/Layout'
import Words from './pages/words/Words'
import Last from './pages/last/Last'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/words" element={<Words />} />
        <Route path="/last" element={<Last />} />
      </Route>
    </Routes>
  )
}

export default App