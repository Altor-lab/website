import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import CompareDocChatbots from './pages/CompareDocChatbots'
import CompareSupportPlatformAI from './pages/CompareSupportPlatformAI'
import UseCaseAPIErrors from './pages/UseCaseAPIErrors'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/compare/altor-vs-doc-chatbots" element={<CompareDocChatbots />} />
        <Route path="/compare/altor-vs-support-platform-ai" element={<CompareSupportPlatformAI />} />
        <Route path="/use-case/api-error-investigation" element={<UseCaseAPIErrors />} />
      </Routes>
    </Layout>
  )
}

export default App
