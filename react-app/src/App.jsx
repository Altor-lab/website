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
import Blog from './pages/Blog'
import BlogEntry from './pages/BlogEntry'
import Glossary from './pages/Glossary'
import GlossaryEntry from './pages/GlossaryEntry'
import ClickhouseIntegration from './pages/ClickhouseIntegration'
import LinearIntegration from './pages/LinearIntegration'
import StripeIntegration from './pages/StripeIntegration'
import Platform from './pages/Platform'
import About from './pages/About'
import Team from './pages/Team'
import Security from './pages/Security'
import Pricing from './pages/Pricing'
import WorkSupportInvestigation from './pages/WorkSupportInvestigation'
import NotFound from './pages/NotFound'
import ForZendeskTeams from './pages/ForZendeskTeams'
import ForIntercomTeams from './pages/ForIntercomTeams'
import ForFreshdesk from './pages/ForFreshdesk'
import ForFintech from './pages/ForFintech'
import ForDevtools from './pages/ForDevtools'
import ForDataInfra from './pages/ForDataInfra'
import ForEcommercePlatforms from './pages/ForEcommercePlatforms'
import ForObservability from './pages/ForObservability'
import ForClickhouseTeams from './pages/ForClickhouseTeams'
import ForStripeBilling from './pages/ForStripeBilling'
import AIStackTracker from './pages/AIStackTracker'
import AIStackEntry from './pages/AIStackEntry'
import MCPServers from './pages/MCPServers'
import MCPServerEntry from './pages/MCPServerEntry'
import AutomationsIndex from './pages/AutomationsIndex'
import AutomationPage from './pages/AutomationPage'
import NYC from './pages/NYC'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nyc" element={<NYC />} />
        <Route path="/platform" element={<Platform />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/security" element={<Security />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/work/support-investigation" element={<WorkSupportInvestigation />} />
        <Route path="/compare/altor-vs-doc-chatbots" element={<CompareDocChatbots />} />
        <Route path="/compare/altor-vs-support-platform-ai" element={<CompareSupportPlatformAI />} />
        <Route path="/compare/altor-vs-copilot-for-support" element={<CompareCopilotSupport />} />
        <Route path="/use-case/api-error-investigation" element={<UseCaseAPIErrors />} />
        <Route path="/use-case/webhook-failure-investigation" element={<UseCaseWebhookFailure />} />
        <Route path="/use-case/billing-escalation-debugging" element={<UseCaseBillingEscalation />} />
        <Route path="/for/ai-infrastructure-companies" element={<ForAIInfra />} />
        <Route path="/for/api-first-developer-tools" element={<ForAPIDevTools />} />
        <Route path="/for/zendesk-teams" element={<ForZendeskTeams />} />
        <Route path="/for/intercom-teams" element={<ForIntercomTeams />} />
        <Route path="/for/freshdesk-teams" element={<ForFreshdesk />} />
        <Route path="/for/fintech-companies" element={<ForFintech />} />
        <Route path="/for/devtools-companies" element={<ForDevtools />} />
        <Route path="/for/data-infrastructure-companies" element={<ForDataInfra />} />
        <Route path="/for/ecommerce-platforms" element={<ForEcommercePlatforms />} />
        <Route path="/for/observability-companies" element={<ForObservability />} />
        <Route path="/for/clickhouse-teams" element={<ForClickhouseTeams />} />
        <Route path="/for/stripe-billing-teams" element={<ForStripeBilling />} />
        <Route path="/ai-stack" element={<AIStackTracker />} />
        <Route path="/ai-stack/:domainSlug" element={<AIStackEntry />} />
        <Route path="/mcp-servers" element={<MCPServers />} />
        <Route path="/mcp-servers/:owner/:repo" element={<MCPServerEntry />} />
        <Route path="/automate" element={<AutomationsIndex />} />
        <Route path="/automate/:workflow/with/:tool" element={<AutomationPage />} />
        <Route path="/customers/portkey" element={<CustomerPortkey />} />
        <Route path="/glossary" element={<Glossary />} />
        <Route path="/integrations/clickhouse" element={<ClickhouseIntegration />} />
        <Route path="/integrations/linear" element={<LinearIntegration />} />
        <Route path="/integrations/stripe" element={<StripeIntegration />} />
        <Route path="/glossary/:term" element={<GlossaryEntry />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogEntry />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

export default App
