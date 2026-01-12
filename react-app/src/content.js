// Single source of truth for all website copy
// Edit this file to update content without touching JSX

export const content = {
  // Company Info
  companyName: 'Altor',
  tagline: 'Enterprise deployment automation for AI companies',

  // Hero Section
  hero: {
    headline: 'Enterprise deployment automation for AI companies',
    subhead: [
      'Turn enterprise deployment requests into merged PRs in hours, not days.',
      'Altor automates the manual work—from meeting notes to tickets to code to CI fixes.',
      'Your FDEs focus on architecture, not repetitive implementation.'
    ],
    highlight: 'Meeting recording → Tickets → PRs → Reviews → Merge',
    primaryCTA: {
      text: 'Book a demo',
      url: 'https://calendar.app.google/Xh3jbxtMPotCz2pXA'
    },
    tryProduct: {
      text: 'Try Altor',
      url: 'https://app.altorlab.com',
      badge: 'Product'
    },
    secondaryCTA: {
      text: 'See how it works',
      anchor: '#how-it-works'
    },
    trustedBy: {
      label: 'TRUSTED BY INNOVATIVE AI TEAMS',
      logos: [
        { name: 'TechCo', opacity: 0.5 },
        { name: 'AI Systems', opacity: 0.5 },
        { name: 'DataFlow', opacity: 0.5 },
        { name: 'NeuralNet', opacity: 0.5 }
      ]
    }
  },

  // How It Works Section
  howItWorks: {
    label: 'How it works',
    title: 'From customer meeting to merged PR',
    subtitle: 'Our agent doesn\'t just draft-it iterates through CI failures and reviewer comments until the PR is ready.',
    steps: [
      {
        number: '01',
        title: 'Meeting Recording',
        description: 'Capture customer requirements from calls. We consume screen recordings when screen sharing happens-not just meeting notes.'
      },
      {
        number: '02',
        title: 'Automatic Tickets',
        description: 'Transform vague requirements into structured Jira tickets and Linear issues. "Make it faster" becomes specific, actionable code changes.'
      },
      {
        number: '03',
        title: 'PR Generation',
        description: 'Generate pull requests across the right repos. Our agent knows which of your 50+ repos to touch for "add SSO" vs "fix webhook retry."'
      },
      {
        number: '04',
        title: 'Review & Iterate',
        description: 'Address reviewer comments, fix CI failures, iterate until green. The agent doesn\'t just draft-it ships.'
      },
      {
        number: '05',
        title: 'Merge',
        description: 'Ready to merge when your team wakes up. Median time from meeting to merged PR: 9 hours.'
      }
    ]
  },

  // What Makes This Hard Section
  challenges: {
    label: 'What makes this hard',
    title: 'The complexity we handle so you don\'t have to',
    items: [
      {
        title: 'Enterprise-scale codebase navigation',
        description: 'Enterprise customers have 50+ repos. We maintain a directory map so the agent knows exactly which repo to touch for each request.'
      },
      {
        title: 'Requirement translation',
        description: '"Add SSO" means different things for different customers. We learn their stack and translate vague requirements into specific code changes.'
      },
      {
        title: 'Visual context understanding',
        description: 'Meeting notes aren\'t enough. We consume screen recordings when screen sharing happens to capture the full context.'
      },
      {
        title: 'Historical pattern matching',
        description: 'Before writing code, we pull similar past Jira issues and Slack threads to give the agent direction on what worked before.'
      },
      {
        title: 'Decision trace management',
        description: 'Context overload kills agents. We maintain decision traces-compressed logs of what the agent tried and why-so it doesn\'t get lost in 50 files.'
      },
      {
        title: 'Human-in-the-loop controls',
        description: 'You\'re never locked out. Review, approve, or reject any change before it ships. We integrate directly with your existing approval workflows.'
      }
    ]
  },

  // Capabilities Section
  capabilities: {
    label: 'Capabilities',
    title: 'Built for enterprise AI deployments',
    items: [
      {
        title: 'Multi-repo orchestration',
        description: 'Navigate complex enterprise codebases with 50+ repositories. Automatic routing to the right repo for each change.'
      },
      {
        title: 'Implementation memory',
        description: 'Never solve the same problem twice. Surface code, configs, and solutions from past customer deployments.'
      },
      {
        title: 'Context-aware code generation',
        description: 'Understand customer stack, constraints, and preferences. Generate code that fits their environment, not generic templates.'
      },
      {
        title: 'CI/CD integration',
        description: 'Iterate through test failures and CI issues automatically. Ship PRs that pass your pipeline.'
      },
      {
        title: 'Review automation',
        description: 'Respond to reviewer comments, make requested changes, and iterate until approval.'
      },
      {
        title: 'Async execution',
        description: 'Ship while your team sleeps. Customer requests processed overnight, ready to review in the morning.'
      },
      {
        title: 'Repeatable enterprise delivery',
        description: 'Standardize and scale your deployment process. Turn one-off custom implementations into repeatable patterns that work across all enterprise customers.'
      },
      {
        title: 'Security & Compliance',
        description: 'Enterprise-grade security by default. SOC2 Type II ready, on-prem deployment options, and full audit logs for every agent action.'
      }
    ]
  },

  // Stats Section
  stats: {
    items: [
      { value: '9 hrs', label: 'Meeting to merged PR' },
      { value: '50+', label: 'Repos navigated per customer' },
      { value: '10x', label: 'Faster implementation cycles' }
    ]
  },

  // Who It's For Section
  whoItsFor: {
    label: 'Who it\'s for',
    title: 'Built for AI companies shipping enterprise deployments',
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
          'Repeatable enterprise delivery for AI vendors',
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
        answer: 'We maintain a directory map for each customer so the agent knows exactly which repo to touch. Before writing code, we also pull similar past Jira issues and Slack threads for context on what worked before.'
      },
      {
        question: 'What inputs does the agent need?',
        answer: 'Meeting recordings are the primary input. We also consume screen recordings when screen sharing happens-not just meeting notes. The agent extracts requirements and translates them into actionable tickets.'
      },
      {
        question: 'How do you prevent the agent from getting confused?',
        answer: 'Context overload kills agents. We maintain decision traces-compressed logs of what the agent tried and why-so it doesn\'t get lost in 50 files or repeat failed approaches.'
      }
    ]
  },

  // Final CTA Section
  finalCTA: {
    title: 'Ready to ship while you sleep?',
    description: 'See how Altor can accelerate your enterprise deployments.',
    buttonText: 'Book a demo',
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
