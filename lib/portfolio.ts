export type Project = {
  id: string
  name: string
  category: string
  status: string
  description: string
  detail: string
  headline: string[]
  steps: string[]
  tone: "blue" | "green" | "orange" | "ink"
}

export const projects: Project[] = [
  {
    id: "blvnk",
    name: "BLVNK",
    category: "Tax practice workflows",
    status: "Pilot preparation",
    description: "Helping South African tax practices prepare, review and track client work with clear ownership, supporting evidence and an audit trail.",
    detail: "The first pilot focuses on Xero-based VAT201 exception review, practitioner-controlled client follow-up, and a manual SARS eFiling handoff. The accountant stays in control.",
    headline: ["Less chasing.", "More clarity."],
    steps: ["Reconcile", "Review", "Resolve"],
    tone: "blue",
  },
  {
    id: "friday",
    name: "Friday",
    category: "Personal AI operator",
    status: "Active build",
    description: "Turning loose commitments, notes and priorities into a clear execution plan for the week.",
    detail: "A personal agent built around a simple idea: planning should help you move. Friday explores how AI workflows can reduce context switching and make the next action clearer.",
    headline: ["A little less busy.", "A lot more done."],
    steps: ["Capture", "Prioritise", "Act"],
    tone: "orange",
  },
  {
    id: "draft",
    name: "DRAFT",
    category: "Agentic dashboard",
    status: "Design & implementation",
    description: "An operator view for prompts, system state and workflow outcomes, bringing visibility to agent systems.",
    detail: "The work centres on a usable control surface: understanding what an agent is doing, inspecting its state, and seeing the outcome of a workflow in one place.",
    headline: ["See the system.", "Steer the work."],
    steps: ["Observe", "Inspect", "Understand"],
    tone: "ink",
  },
  {
    id: "cost-control",
    name: "Cost Control",
    category: "Agentic research project",
    status: "Research & development",
    description: "Exploring how an AI agent can help individuals, freelancers and small businesses make better subscription decisions.",
    detail: "The proposed system combines costs, renewals and available usage evidence to recommend what to keep, pause, downgrade or review. Account integrations depend on provider support and user permission.",
    headline: ["Know the cost.", "Question the value."],
    steps: ["Connect", "Evaluate", "Recommend"],
    tone: "green",
  },
  {
    id: "outcome",
    name: "OUTCOME",
    category: "Trading research platform",
    status: "Planning / private research beta",
    description: "Planning a private trading research platform around the JEV trading system, with explicit HOLD and NO TRADE safeguards.",
    detail: "The current scope is research and a private beta. Paid actionable signals and production data resale remain gated on regulatory and commercial approvals.",
    headline: ["Research first.", "Decisions second."],
    steps: ["Research", "Validate", "Review"],
    tone: "blue",
  },
]

export const socialLinks = [
  { label: "GitHub", href: "https://github.com/TheReal-KT" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/khuluza-tshabalala-933161288/" },
]

export const events = [
  {
    name: "Google Cloud Summit",
    date: "01 July 2026",
    dateTime: "2026-07-01",
    venue: "Sandton Convention Centre",
    category: "Cloud / AI / Africa",
    description: "Building for Africa. A meeting point for cloud technology, agentic AI and the people shaping what comes next.",
    image: "/events/google-cloud-2026.webp",
    alt: "Google Cloud leaders and guests at the 2026 Johannesburg summit",
    source: "https://blog.google/intl/en-africa/company-news/outreach-and-initiatives/accelerating-africas-digital-renaissance-by-investing-in-infrastructure-and-agentic-ai/",
    credit: "Event photography · Google",
  },
  {
    name: "AWS Summit Johannesburg",
    date: "19 August 2026",
    dateTime: "2026-08-19",
    venue: "Gallagher Convention Centre",
    category: "Cloud / Builders / Community",
    description: "A day around the possibilities of cloud and AI, from agentic systems to the infrastructure that makes them work.",
    image: "/events/aws-summit-2026.jpg",
    alt: "Promotional artwork for AWS Summit Johannesburg 2026",
    source: "https://aws.amazon.com/events/summits/johannesburg/",
    credit: "Event imagery · AWS",
  },
]
