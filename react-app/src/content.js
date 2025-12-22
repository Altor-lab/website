// Single source of truth for all website copy
// Edit this file to update content without touching JSX

export const content = {
  // Company Info
  companyName: 'AltorLab',
  tagline: 'Forward-deployed engineering for production AI',

  // Hero Section
  hero: {
    headline: 'Your forward-deployed engineer for production AI',
    subhead: 'We embed with your team to get customers live in production-securely, reliably, and without stalled pilots.',
    primaryCTA: {
      text: 'Book a call',
      url: 'https://calendar.app.google/Xh3jbxtMPotCz2pXA'
    },
    secondaryCTA: {
      text: 'How we work',
      anchor: '#how-we-work'
    }
  },

  // What We Do Section
  whatWeDo: {
    label: 'Capabilities',
    title: 'What we do',
    items: [
      {
        title: 'Integrate',
        description: 'Wire your product into customer environments: data, tools, identity, and infrastructure-production-ready.'
      },
      {
        title: 'Deploy',
        description: 'Measured rollouts with monitoring, runbooks, and reliability engineering-so teams can own the system.'
      },
      {
        title: 'Expand',
        description: 'Handle expansion requirements from existing customers and fold learnings into your roadmap-supporting higher NRR.'
      }
    ]
  },

  // How We Work Section
  howWeWork: {
    label: 'Process',
    title: 'How we work',
    steps: [
      {
        phase: 'Discover',
        description: 'Map customer constraints, success criteria, and rollout plan.'
      },
      {
        phase: 'Build',
        description: 'Ship working code via PRs. Set up observability and operational readiness.'
      },
      {
        phase: 'Launch',
        description: 'Coordinate rollout, stabilize, and document what matters.'
      },
      {
        phase: 'Transfer',
        description: 'Handover with runbooks, documentation, and knowledge sessions.'
      }
    ],
    summary: 'Short sprint cycles. PR-based delivery. Clear handover.'
  },

  // Security Section
  security: {
    label: 'Security',
    title: 'Security-conscious by default',
    description: 'Least-privilege access, audit trails, and customer-controlled environments.'
  },

  // FAQ Section
  faq: {
    label: 'FAQ',
    items: [
      {
        question: 'What is forward-deployed engineering?',
        answer: 'We work inside real customer environments to deliver end-to-end deployments-hands-on engineering, not a black box.'
      },
      {
        question: 'What do you deliver?',
        answer: 'Production deployments: integrations, rollout plan, monitoring, runbooks, and documentation your team can maintain.'
      },
      {
        question: 'How do you support customer expansion?',
        answer: 'We implement high-signal customer requests, package them into repeatable patterns, and align them with your product roadmap to unlock expansions.'
      }
    ]
  },

  // Final CTA Section
  finalCTA: {
    title: 'Ready to ship and expand?',
    description: 'Book a call to discuss your customer rollouts and expansion goals.',
    buttonText: 'Book a call',
    buttonUrl: 'https://calendar.app.google/Xh3jbxtMPotCz2pXA',
    email: 'anshul@altorlab.com'
  },

  // Footer
  footer: {
    copyright: `© ${new Date().getFullYear()} AltorLab`,
    email: 'anshul@altorlab.com',
    linkedIn: 'https://www.linkedin.com/in/ansh27/',
    privacy: 'Privacy Policy'
  }
}
