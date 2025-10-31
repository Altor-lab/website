import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import AIInsights from './pages/AIInsights'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai-insights" element={<AIInsights />} />
      </Routes>
    </Layout>
  )
}

export default App

