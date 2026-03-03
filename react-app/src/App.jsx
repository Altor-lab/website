import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import CompareDocChatbots from './pages/CompareDocChatbots'
import CompareSupportPlatformAI from './pages/CompareSupportPlatformAI'
import CompareCopilotSupport from './pages/CompareCopilotSupport'
import UseCaseAPIErrors from './pages/UseCaseAPIErrors'
import UseCaseWebhookFailure from './pages/UseCaseWebhookFailure'
import UseCaseBillingEscalation from './pages/UseCaseBillingEscalation'
import ForAIInfra from './pages/ForAIInfra'
import ForAPIDevTools from './pages/ForAPIDevTools'
import CustomerPortkey from './pages/CustomerPortkey'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/compare/altor-vs-doc-chatbots" element={<CompareDocChatbots />} />
        <Route path="/compare/altor-vs-support-platform-ai" element={<CompareSupportPlatformAI />} />
        <Route path="/compare/altor-vs-copilot-for-support" element={<CompareCopilotSupport />} />
        <Route path="/use-case/api-error-investigation" element={<UseCaseAPIErrors />} />
        <Route path="/use-case/webhook-failure-investigation" element={<UseCaseWebhookFailure />} />
        <Route path="/use-case/billing-escalation-debugging" element={<UseCaseBillingEscalation />} />
        <Route path="/for/ai-infrastructure-companies" element={<ForAIInfra />} />
        <Route path="/for/api-first-developer-tools" element={<ForAPIDevTools />} />
        <Route path="/customers/portkey" element={<CustomerPortkey />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

export default App
