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
  image?: { src: string; alt: string; width: number; height: number }
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
    image: { src: "/projects/blvnk-landing.png", alt: "BLVNK landing page describing tax intelligence and the next practical action for South African accounting firms", width: 1600, height: 861 },
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
    image: { src: "/projects/draft-dashboard.png", alt: "DRAFT light dashboard with continued learning, an AI Engineer idea, tool integration and a focus snapshot", width: 1600, height: 951 },
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
    image: { src: "/projects/outcome.png", alt: "OUTCOME landing page with the headline Less noise, More perspective, Your kind of clarity", width: 1600, height: 899 },
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
    image: "/events/google-cloud-summit-2026.webp",
    alt: "Google Cloud Summit Johannesburg promotional artwork for 1 July 2026",
    imageFit: "contain" as const,
    source: "https://cloudonair.withgoogle.com/events/google-cloud-summit-johannesburg-26",
    credit: "Promotional artwork · Google Cloud",
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
    imageFit: "cover" as const,
    source: "https://aws.amazon.com/events/summits/johannesburg/",
    credit: "Event imagery · AWS",
  },
]
