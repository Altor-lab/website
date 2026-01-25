// Single source of truth for all website copy
// Edit this file to update content without touching JSX

export const content = {
  // Company Info
  companyName: 'Altor',
  tagline: 'Customer meeting → merged PR in hours',

  // Hero Section
  hero: {
    headline: 'Customer meeting → merged PR in hours',
    subhead: 'We turn customer meeting recordings into production code. SSO, RBAC, audit logs-shipped in hours, not weeks.',
    alternateSubhead: 'Enterprise readiness work is 85% identical across customers. We automated it.',
    primaryCTA: {
      text: 'Book a demo',
      url: 'https://calendly.com/founders-altorlab/30min'
    },
    tryProduct: {
      text: 'Try Altor',
      url: 'https://app.altorlab.com',
    },
    secondaryCTA: {
      text: 'See how it works',
      anchor: '#how-it-works'
    }
  },

  // Key Metrics - displayed prominently
  metrics: {
    items: [
      { value: '9 hours', label: 'median meeting → PR' },
      { value: '85%', label: 'feature overlap across customers' },
      { value: '2-4 weeks', label: 'typical deployment without Altor' }
    ],
    socialProof: 'Currently deployed at Portkey and DoorDash. 5 PRs opened, 3 merged in last 30 days.'
  },

  // The Problem Section - Broken Workflow
  theProblem: {
    label: 'The Problem',
    title: 'The Broken Workflow',
    subtitle: 'Every time a customer says something in a meeting:',
    steps: [
      { arrow: '→', text: 'An FDE/SE interprets it' },
      { arrow: '→', text: 'A ticket gets written (if they remember)' },
      { arrow: '→', text: 'A PM prioritizes it' },
      { arrow: '→', text: 'An engineer implements it' }
    ],
    conclusion: 'By the time code ships: 60-80% of customer intent is diluted.',
    impact: [
      'Features miss the mark',
      '"Fixed" bugs don\'t address root cause',
      '2-4 weeks per deployment',
      'Deals slow or die'
    ]
  },

  // How It Works Section - 5 Step Pipeline
  howItWorks: {
    label: 'How it works',
    title: 'From customer meeting to merged PR',
    subtitle: 'Our agent doesn\'t just draft-it iterates through CI failures and reviewer comments until the PR is ready.',
    steps: [
      {
        number: '1',
        title: 'Ingest meeting',
        shortTitle: 'Ingest',
        description: 'Recording + screen share captured. We consume visual context, not just meeting notes.'
      },
      {
        number: '2',
        title: 'Extract requirements',
        shortTitle: 'Extract',
        description: 'Match customer requests to our pattern library. "Add SSO" becomes specific, actionable code changes.'
      },
      {
        number: '3',
        title: 'Generate code',
        shortTitle: 'Generate',
        description: 'Adapted to your stack. We know which of your 50+ repos to touch for each change.'
      },
      {
        number: '4',
        title: 'Run CI, fix failures',
        shortTitle: 'CI/Fix',
        description: 'Iterate until green. The agent doesn\'t stop at draft-it ships.'
      },
      {
        number: '5',
        title: 'Merged PR',
        shortTitle: 'Merge',
        description: 'Responds to review comments. Ready to merge when your team wakes up.'
      }
    ]
  },

  // Context Graph Feature
  contextGraph: {
    label: 'Key Differentiator',
    title: 'The Context Graph',
    subtitle: 'We maintain a living knowledge graph of your customer relationships and codebase.',
    features: [
      { icon: 'chat', text: 'Past meeting summaries' },
      { icon: 'ticket', text: 'Extracted Linear/GitHub work items (completed + pending)' },
      { icon: 'pattern', text: 'Communication patterns ("Sarah mentioned API timeouts in 3 of last 5 meetings")' },
      { icon: 'git', text: 'Repo commit history ("who owns what")' },
      { icon: 'code', text: 'Technical stack and repo structure for pattern detection' }
    ]
  },

  // The Moat Section
  theMoat: {
    label: 'The Moat',
    title: 'Every deployment makes us better',
    description: 'After 100+ deployments, the pattern library becomes the moat: faster shipping and higher-quality implementations across customers.',
    oneLiner: 'Altor turns customer meetings into merged PRs. We automate enterprise readiness so your FDEs stay in flow and customers see PRs within hours.'
  },

  // Who It's For Section
  whoItsFor: {
    label: 'Who it\'s for',
    title: 'Built for AI companies selling to enterprise',
    items: [
      {
        title: 'AI-native companies',
        points: [
          'Shipping custom enterprise deployments',
          'FDE team stretched across too many accounts',
          'Customer requests piling up in the backlog',
          'Deals dying while waiting for implementation'
        ]
      },
      {
        title: 'Enterprise software vendors',
        points: [
          'Scaling professional services without headcount',
          'Reducing time-to-value for customers',
          'Consistent delivery across engagements',
          'Capturing and reusing implementation patterns'
        ]
      }
    ]
  },

  // FAQ Section
  faq: {
    label: 'FAQ',
    items: [
      {
        question: 'How does Altor handle different customer environments?',
        answer: 'We learn each customer\'s stack, repo structure, and preferences. "Add SSO" means different things for different customers-we translate vague requirements into specific code changes that fit their environment.'
      },
      {
        question: 'What if the generated PR needs changes?',
        answer: 'Our agent doesn\'t just draft-it iterates. It responds to reviewer comments, fixes CI failures, and continues iterating until the PR is ready to merge.'
      },
      {
        question: 'How do you handle context across 50+ repos?',
        answer: 'We maintain a directory map for each customer so the agent knows exactly which repo to touch. Before writing code, we also pull similar past issues and threads for context on what worked before.'
      },
      {
        question: 'What inputs does the agent need?',
        answer: 'Meeting recordings are the primary input. We also consume screen recordings when screen sharing happens-not just meeting notes. The agent extracts requirements and translates them into actionable tickets.'
      },
      {
        question: 'What\'s the typical turnaround time?',
        answer: 'Median time from meeting to merged PR is 9 hours. Ship while your team sleeps-customer requests processed overnight, ready to review in the morning.'
      }
    ]
  },

  // Final CTA Section
  finalCTA: {
    title: 'Stop losing deals to enterprise readiness work',
    description: 'See how Altor turns customer meetings into merged PRs in hours.',
    buttonText: 'Book a demo',
    buttonUrl: 'https://calendly.com/founders-altorlab/30min',
    email: 'anshul@altorlab.com'
  },

  // Footer
  footer: {
    copyright: `© ${new Date().getFullYear()} Altor`,
    email: 'anshul@altorlab.com',
    linkedIn: 'https://www.linkedin.com/in/ansh27/',
  }
}
