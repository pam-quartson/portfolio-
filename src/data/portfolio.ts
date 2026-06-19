/**
 * Canonical portfolio content, sourced from Pamela Quartson's CVs (resumes/).
 * Contact URLs fall back to VITE_* env vars; links are omitted when unset
 * (never rendered as href="#").
 */

export type ProjectId = "graphrag" | "satellite-disaster" | "swiftmedai" | "video-roulette";

export type NarrativeId = "systems";

function env(key: string): string | null {
  const value = import.meta.env[key];
  return typeof value === "string" && value.trim() !== "" ? value.trim() : null;
}

export interface Metric {
  value: string;
  label: string;
}

export interface Contact {
  email: string | null;
  github: string | null;
  linkedIn: string | null;
  berkeleyProfile: string | null;
}

/** Real values come from her CV and UC Berkeley I School profile. */
export const contact: Contact = {
  email: "pamela.quartson@berkeley.edu",
  berkeleyProfile: "https://www.ischool.berkeley.edu/people/pamela-quartson",
  github: "https://github.com/pam-quartson",
  // TODO(owner): Set VITE_LINKEDIN_URL once confirmed.
  linkedIn: env("VITE_LINKEDIN_URL"),
};

export const profile = {
  name: "Pamela Quartson",
  title: "Data Engineer",
  location: "Berkeley, CA",
  tagline: "Data Engineer · UC Berkeley MIMS '26 · Systems Builder",
  summary:
    "Data engineer and full-stack developer who builds automated ELT pipelines, integrates third-party APIs, and ships production data systems across cloud environments. Comfortable owning a data workflow end to end, from schema design and ingestion through transformation, validation, monitoring, and deployment.",
  about: [
    "Pamela Quartson is a data engineer graduating from UC Berkeley (Master of Information Management and Systems, Applied Data Science certificate) in May 2026.",
    "She builds ELT pipelines, automated data-quality systems, and knowledge-graph retrieval, owning data systems end to end across structured and unstructured sources. Her experience spans cloud-native backend engineering, real-time analytics, and applied AI/ML.",
    "She has led a 3-person engineering team on UC Berkeley's carbon registry, partnered with US Treasury researchers to turn ML predictions into policy, and built production systems for micro-merchants in Ghana's informal trade sector.",
    "Currently seeking data or systems engineering roles at teams solving hard technical problems.",
  ],
} as const;

export interface ExperienceRole {
  id: string;
  role: string;
  org: string;
  /** Short context line about the org or product. */
  orgNote?: string;
  start: string;
  end: string;
  current?: boolean;
  bullets: string[];
  stack: string[];
  metrics?: Metric[];
}

/** Work history, reverse-chronological. Sourced verbatim-in-substance from CVs. */
export const experience: ExperienceRole[] = [
  {
    id: "vrod",
    role: "Lead Data Engineer",
    org: "UC Berkeley Goldman School of Public Policy",
    orgNote:
      "VROD centralizes 10,000+ carbon offset records from six global registries; downloaded 2,100+ times in 2026 by researchers, traders, and policymakers.",
    start: "Sep 2025",
    end: "Present",
    current: true,
    bullets: [
      "Lead maintenance and expansion of automated Python ELT pipelines for the Voluntary Registry Offsets Database (VROD), integrating multiple third-party registry APIs to ingest, transform, and centralize records into a unified store.",
      "Own end-to-end pipeline reliability: designed schema structures, error handling, automated data validation, and monitoring logic, cutting manual intervention by 30% and improving accuracy across all six sources.",
      "Added a new data registry end to end, integrating the third-party API and building the ELT pipeline from scratch through to production.",
      "Diagnosed and fixed logic flaws in an existing pipeline, then extended it to handle new transaction types.",
      "Lead a 3-person engineering team, running sprint planning, code reviews, and mentorship.",
    ],
    stack: ["Python", "PostgreSQL", "REST APIs", "ELT", "Data Validation", "GCP"],
    metrics: [
      { value: "10K+", label: "records unified" },
      { value: "30%", label: "less manual QA" },
      { value: "2,100+", label: "downloads in 2026" },
    ],
  },
  {
    id: "treasury",
    role: "Research Analyst",
    org: "UC Berkeley School of Information / US Treasury Department",
    orgNote:
      "Decision-theoretic framework converting ML predictions into policy actions, targeting tax-credit take-up for 2M+ eligible college students.",
    start: "Aug 2025",
    end: "Dec 2025",
    bullets: [
      "Partnered with an interdisciplinary team of researchers and policymakers to validate a framework that turns ML predictions into policy actions.",
      "Ran sensitivity and scenario analyses in R to stress-test model assumptions and quantify how parameter uncertainty propagates into policy recommendations.",
      "Engineered synthetic data pipelines in R for rigorous controlled testing under confidentiality constraints, with no access to real Treasury data.",
      "Kept research on schedule through a government shutdown, adapting workflows under significant ambiguity.",
      "Translated technical findings for non-technical Treasury stakeholders, bridging academic research and real-world policy.",
    ],
    stack: ["R", "Machine Learning", "Synthetic Data", "Statistical Analysis"],
  },
  {
    id: "ppic",
    role: "Web Developer",
    org: "UC Berkeley Goldman School of Public Policy",
    orgNote: "AI chatbot for the Public Policy Institute of California (PPIC).",
    start: "Jun 2025",
    end: "Sep 2025",
    bullets: [
      "Co-developed an AI chatbot for the Public Policy Institute of California.",
      "Built backend API endpoints in PHP Laravel connecting to Amazon Bedrock AI models, backed by a MySQL database for application data.",
      "Built the React frontend, handling real-time messaging and state management.",
    ],
    stack: ["PHP Laravel", "Amazon Bedrock", "React", "MySQL"],
  },
  {
    id: "street-streams",
    role: "Software Engineer (Full-Stack)",
    org: "Street Streams Limited",
    orgNote: "Brorno, an e-commerce platform for micro-merchants in Ghana's informal trade sector.",
    start: "Jul 2022",
    end: "Jul 2024",
    bullets: [
      "Designed and built the cloud-native backend from scratch on GCP (Compute Engine, Cloud SQL, Cloud Run) as the founding engineer, including document-based and SQL data stores.",
      "Built a real-time analytics dashboard aggregating business and user metrics from multiple sources, replacing manual daily queries and cutting leadership reporting time by 80%.",
      "Traced API slowness to sequential processing with no caching; parallelized with worker threads and added Redis caching, cutting response times by 25%.",
      "Supported merchants and field teams, translating user feedback into product improvements.",
    ],
    stack: ["GCP", "Node.js", "Redis", "Cloud SQL", "Real-time Analytics"],
    metrics: [
      { value: "80%", label: "faster reporting" },
      { value: "25%", label: "faster API response" },
    ],
  },
  {
    id: "518innovations",
    role: "Software Engineer (Full-Stack)",
    org: "518Innovations",
    start: "Jun 2021",
    end: "Jun 2022",
    bullets: [
      "Owned backend-heavy work for client projects: designed and built MySQL databases, then built Laravel backend logic on top, including the data model for an online drugstore for a pharmaceutical client.",
      "Built and integrated PHP Laravel REST APIs, testing endpoints with Postman before release.",
      "Used Docker for containerized deployment; caching and query optimization improved API response times by 10%.",
    ],
    stack: ["PHP Laravel", "MySQL", "Docker", "REST APIs", "Postman"],
  },
];

export interface Project {
  id: ProjectId;
  name: string;
  context: string;
  period: string;
  summary: string;
  bullets: string[];
  metrics: Metric[];
  tech: string[];
  links: {
    github: string | null;
    githubLabel: string;
    secondary: string | null;
    secondaryLabel: string;
  };
}

/** Personal / academic projects, distinct from paid work experience. */
export const projects: Project[] = [
  {
    id: "graphrag",
    name: "Privacy Regulation GraphRAG System",
    context: "UC Berkeley · Applied NLP",
    period: "Jan 2025 to May 2025",
    summary:
      "A retrieval system that answers complex privacy-regulation queries by combining semantic search with knowledge graphs extracted through zero-shot prompting, benchmarked against baseline RAG.",
    bullets: [
      "Built a GraphRAG system with LangChain, ChromaDB, and Memgraph, replacing static vector files with a queryable graph + vector store.",
      "Used zero-shot prompting to extract the knowledge graph from raw regulatory text, with no manual annotation.",
      "Added an agentic workflow that refreshes data sources automatically.",
      "Improved accuracy by 21% and precision by 17% over baseline RAG (0.87 and 0.96 respectively) at 450ms average retrieval latency.",
    ],
    metrics: [
      { value: "+21%", label: "accuracy over RAG" },
      { value: "+17%", label: "precision over RAG" },
      { value: "450ms", label: "avg retrieval latency" },
    ],
    tech: ["Python", "LangChain", "ChromaDB", "Memgraph", "Zero-shot Prompting"],
    links: {
      github: "https://github.com/pam-quartson/Privacy-Regulation-GraphRAG",
      githubLabel: "View Source",
      secondary: env("VITE_GRAPHRAG_PAPER_URL"),
      secondaryLabel: "Write-up",
    },
  },
  {
    id: "satellite-disaster",
    name: "Satellite Disaster Image Classification",
    context: "UC Berkeley School of Information",
    period: "2025",
    summary:
      "An ML pipeline that classifies satellite imagery by disaster type and damage severity to speed up emergency-response resource allocation.",
    bullets: [
      "Built an ML pipeline classifying satellite imagery by disaster type (flooding vs. fire) and damage severity on a 0 to 3 scale.",
      "Engineered compact image feature vectors from color, texture, and edge statistics, reaching 99% cross-validated accuracy on disaster type and 0.498 macro F1 on damage severity across 4 imbalanced classes.",
      "Diagnosed and communicated model limitations, including an unlearnable minority class and a feature-expressiveness ceiling, with concrete recommendations to improve severity classification.",
    ],
    metrics: [
      { value: "99%", label: "accuracy, disaster type" },
      { value: "0.498", label: "macro F1, severity" },
    ],
    tech: ["Python", "Machine Learning", "Computer Vision", "Feature Engineering"],
    links: {
      github: "https://github.com/pam-quartson/Projects",
      githubLabel: "View Source",
      secondary: null,
      secondaryLabel: "Write-up",
    },
  },
  {
    id: "swiftmedai",
    name: "SwiftMedAI",
    context: "Agentic AI · Healthcare logistics",
    period: "2026",
    summary:
      "An autonomous agent that coordinates emergency medical supply with a live clinical-authorization step in the loop, so urgent resupply moves quickly without skipping human sign-off.",
    bullets: [
      "Built an agentic Python workflow that automates emergency supply requests end to end.",
      "Added a live clinical-authorization gate so a qualified human approves before fulfillment.",
      "Designed the pipeline to act autonomously on routine steps while escalating decisions that need oversight.",
    ],
    metrics: [
      { value: "Agentic", label: "autonomous workflow" },
      { value: "Live", label: "clinical authorization" },
    ],
    tech: ["Python", "Agentic AI", "Automation"],
    links: {
      github: "https://github.com/pam-quartson/SwiftMedAI",
      githubLabel: "View Source",
      secondary: null,
      secondaryLabel: "Write-up",
    },
  },
  {
    id: "video-roulette",
    name: "Video Roulette Game",
    context: "Frontend · Interactive UI",
    period: "2026",
    summary:
      "A browser roulette game built from scratch with an animated wheel, a betting interface, and a casino-style atmosphere, showing frontend and interaction range beyond data work.",
    bullets: [
      "Built an interactive roulette game in vanilla HTML5, CSS3, and JavaScript, with no framework.",
      "Implemented an animated roulette wheel and a betting interface with real-time state.",
      "Focused on smooth animation and an immersive, responsive game feel.",
    ],
    metrics: [
      { value: "HTML5", label: "canvas + animation" },
      { value: "Vanilla JS", label: "no framework" },
    ],
    tech: ["HTML5", "CSS3", "JavaScript"],
    links: {
      github: "https://github.com/pam-quartson/Video-Roulette-Game",
      githubLabel: "View Source",
      secondary: null,
      secondaryLabel: "Write-up",
    },
  },
];

export interface SkillGroup {
  category: string;
  items: string[];
}

/** Skill sets, grouped by discipline. Merged across all three CVs. */
export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    items: ["Python", "SQL", "JavaScript / TypeScript", "PHP", "Java", "R", "C++"],
  },
  {
    category: "Data Engineering",
    items: [
      "ELT Pipelines",
      "Data Validation",
      "Data Quality Monitoring",
      "Schema Design",
      "Third-party API Integration",
    ],
  },
  {
    category: "AI / ML & Semantic",
    items: [
      "RAG",
      "GraphRAG",
      "LangChain",
      "ChromaDB",
      "Memgraph",
      "Knowledge Graphs",
      "CrewAI",
      "Amazon Bedrock",
    ],
  },
  {
    category: "Frameworks & Tools",
    items: [
      "Node.js",
      "NestJS",
      "Express",
      "React / Redux",
      "Vue",
      "Laravel",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
    ],
  },
  {
    category: "Cloud & Infrastructure",
    items: ["GCP", "AWS", "Docker", "Kubernetes", "REST APIs", "DevOps"],
  },
];

export interface Education {
  school: string;
  degree: string;
  detail?: string;
  date: string;
  courses: string[];
}

export const education: Education[] = [
  {
    school: "UC Berkeley",
    degree: "Master of Information Management and Systems",
    detail: "Graduate Certificate in Applied Data Science",
    date: "May 2026",
    courses: [
      "Principles & Techniques of Data Science",
      "Building Data Products",
      "Introduction to Data Structures and Analytics",
      "Research Design and Applications for Data and Analysis",
      "Applied Generative AI",
      "Applied Natural Language Processing",
    ],
  },
  {
    school: "Ashesi University",
    degree: "BSc, Computer Science",
    date: "May 2021",
    courses: [
      "Data Systems & Machine Learning",
      "Data Science",
      "Data Structures & Algorithms",
      "Algorithm Design & Analysis",
      "Computer Organization and Architecture",
      "Networks and Distributed Computing",
    ],
  },
];

export interface Narrative {
  id: NarrativeId;
  path: string;
  title: string;
  resumePath: string;
  resumeFilename: string;
}

export const narratives: Narrative[] = [
  {
    id: "systems",
    path: "/",
    title: "Systems Journey",
    resumePath: "/resumes/generalist.pdf",
    resumeFilename: "Pamela_Quartson_Resume.pdf",
  },
];

export function getProject(id: ProjectId): Project {
  const project = projects.find((p) => p.id === id);
  if (!project) throw new Error(`Unknown project: ${id}`);
  return project;
}

export function getNarrative(id: NarrativeId): Narrative {
  const narrative = narratives.find((n) => n.id === id);
  if (!narrative) throw new Error(`Unknown narrative: ${id}`);
  return narrative;
}

/** External links that still need real URLs (so we can surface, not invent, them). */
export function missingExternalLinks(): string[] {
  const missing: string[] = [];
  if (!contact.github) missing.push("contact.github");
  if (!contact.linkedIn) missing.push("contact.linkedin");
  for (const p of projects) {
    if (!p.links.github) missing.push(`${p.id}.github`);
  }
  return missing;
}
