// Single source of truth for all website copy
// Edit this file to update content without touching JSX

export const content = {
  // Company Info
  companyName: 'AltorLab',
  tagline: 'Your forward-deployed engineering team',

  // Hero Section
  hero: {
    headline: 'Your forward-deployed engineers',
    subhead: 'Your team is stretched thin. Enterprise deals stall. Expansion opportunities slip away. We embed as your FDEs to close deals, ship deployments, and drive expansion-so you can scale without the hiring bottleneck.',
    primaryCTA: {
      text: 'Book a call',
      url: 'https://calendar.app.google/Xh3jbxtMPotCz2pXA'
    },
    secondaryCTA: {
      text: 'See how it works',
      anchor: '#problem'
    }
  },

  // Problem Section
  problem: {
    label: 'The problem',
    title: 'You\'re growing fast, but your engineering bandwidth isn\'t',
    subtitle: 'AI-native companies face a common challenge:',
    items: [
      {
        title: 'Enterprise deals stall',
        description: 'Your product works, but customers need custom integrations, security reviews, and hands-on deployment support your team can\'t prioritize.'
      },
      {
        title: 'You become reactive',
        description: 'With multiple clients demanding attention, you\'re firefighting instead of proactively expanding accounts and shipping new features.'
      },
      {
        title: 'Expansion revenue slips away',
        description: 'Your enterprise clients have more use cases, but you don\'t have the bandwidth to scope, build, and deploy them. NRR suffers.'
      },
      {
        title: 'Hiring takes too long',
        description: 'Building an FDE team requires elite, high-agency engineers who can code, read the room, and close. They\'re rare and expensive to hire.'
      }
    ]
  },

  // Solution Section
  solution: {
    label: 'Our solution',
    title: 'We become your forward-deployed engineering team',
    subtitle: 'AltorLab engineers embed directly with your enterprise customers. We represent you-proactively driving expansion and deployment work you can\'t get to.',
    items: [
      {
        title: 'Embed & integrate',
        description: 'We deploy into customer environments as an extension of your team. Wire data sources, configure auth, build custom integrations-on-site and production-ready.'
      },
      {
        title: 'Deploy & stabilize',
        description: 'Execute measured rollouts with monitoring and observability. Transfer ownership with comprehensive documentation and runbooks.'
      },
      {
        title: 'Expand & capture',
        description: 'Proactively scope expansion opportunities with your customers. Build the specific use cases that unlock upsells and boost NRR.'
      }
    ]
  },

  // FDE Benefits Section
  fdeBenefits: {
    label: 'Why forward-deployed engineering',
    title: 'Put engineers as close as possible to the problems they\'re solving',
    items: [
      {
        title: 'Real engineers, not consultants',
        description: 'We send software engineers who open an IDE daily and ship production code-not PMs, not sales in a trench coat, not PowerPoint consultants.'
      },
      {
        title: 'Sustained commitment',
        description: 'Deep immersion over weeks and months, not fly-in visits. We stay until the deployment succeeds and knowledge transfers completely.'
      },
      {
        title: 'Full tactical autonomy',
        description: 'You set the objective. We own the execution-data migration, user training, expansion scoping, technical blockers. We escalate only when critical.'
      },
      {
        title: 'Field insights → Product improvements',
        description: 'Customer pain points become product improvements. We capture patterns from the field and feed them directly into your roadmap.'
      },
      {
        title: 'Do things that don\'t scale, at scale',
        description: 'We abstract rare customer insights into repeatable patterns. Custom work becomes reusable product features that accelerate future deployments.'
      },
      {
        title: 'Proactive, not reactive',
        description: 'While your team handles the product roadmap, we\'re in the field identifying expansion opportunities and driving them to close.'
      }
    ]
  },

  // How We Work Section
  howWeWork: {
    label: 'Our process',
    title: 'How we work',
    steps: [
      {
        phase: 'Discover',
        description: 'Map customer constraints, success criteria, workflows, and deployment requirements. Build trust with users.'
      },
      {
        phase: 'Build',
        description: 'Ship working code via PRs to your repos. Build custom integrations in the customer\'s actual environment.'
      },
      {
        phase: 'Launch',
        description: 'Coordinate rollout with customer stakeholders. Monitor stability, iterate on feedback, stabilize the system.'
      },
      {
        phase: 'Transfer',
        description: 'Complete handover with documentation, runbooks, and knowledge transfer. Your customer owns it fully.'
      }
    ],
    summary: 'Sustained deployments. Full autonomy. Clear handover. We work as an extension of your team.'
  },

  // ICP Section
  icp: {
    label: 'Who we work with',
    title: 'Built for fast-growing AI-native companies',
    items: [
      'Scaling AI products with enterprise customers',
      'Closing $100K–$1M+ deals that need hands-on deployment',
      'Engineering team stretched across product and customer work',
      'Expansion opportunities sitting untouched due to bandwidth'
    ]
  },

  // Security Section
  security: {
    label: 'Security',
    title: 'Enterprise-grade',
    description: 'Least-privilege access. Complete audit trails. Customer-controlled infrastructure. We operate within your security policies and compliance requirements.'
  },

  // FAQ Section
  faq: {
    label: 'FAQ',
    items: [
      {
        question: 'What makes FDE different from consulting or staff augmentation?',
        answer: 'FDEs are elite full-stack engineers who embed with sustained presence and full autonomy. We ship production code, own outcomes, and transfer knowledge-not deliver recommendations or temporary headcount.'
      },
      {
        question: 'How long do typical engagements last?',
        answer: 'Meaningful deployments run 8-12 weeks initially. We stay until the system is stable and your customer\'s team owns it completely. Complex enterprise deals may require longer sustained presence.'
      },
      {
        question: 'How do you help with expansion revenue?',
        answer: 'We proactively identify high-signal expansion opportunities while embedded with your customers. We scope the use cases, build the solutions, and package them into patterns that boost NRR and feed your product roadmap.'
      },
      {
        question: 'What kind of engineers do you deploy?',
        answer: 'Elite, high-agency engineers who can code, read the room, and close. They have product intuition, customer-facing savvy, and can wear many hats-the rare breed that makes FDE actually work.'
      },
      {
        question: 'How does this help our product roadmap?',
        answer: 'The feedback loop from FDEs experiencing customer pain at the edge turns directly into product insights. We capture patterns, frameworks, and requirements that define what your product should become.'
      }
    ]
  },

  // Final CTA Section
  finalCTA: {
    title: 'Ready to scale without the hiring bottleneck?',
    description: 'Let\'s discuss how forward-deployed engineering can accelerate your enterprise deployments and expansion.',
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
