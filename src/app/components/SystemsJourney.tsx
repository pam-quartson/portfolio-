import { useState, useRef, useCallback, useEffect } from "react";
import { Github, ExternalLink, FileText, Download, GraduationCap } from "lucide-react";
import { useReducedMotion } from "motion/react";
import {
  contact,
  education,
  experience,
  getNarrative,
  profile,
  projects,
  skillGroups,
  type ExperienceRole,
  type Metric,
  type Project,
} from "@/data/portfolio";
import { scrollToSection, useActiveSection } from "@/app/hooks/useActiveSection";
import {
  DesktopSectionSidebar,
  MobileSectionBar,
  MobileSectionSheet,
} from "@/app/components/systems/SectionNav";
import { SYSTEMS_SECTIONS } from "@/app/components/systems/sectionNav.types";

const narrative = getNarrative("systems");
const SECTION_IDS = SYSTEMS_SECTIONS.map((s) => s.id);
const serif = { fontFamily: "'Libre Baskerville', serif" } as const;

function Mono({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`font-mono text-xs tracking-wide ${className}`}>{children}</span>;
}

function Rule({ className = "" }: { className?: string }) {
  return <div className={`border-t border-foreground/20 ${className}`} aria-hidden="true" />;
}

function StackTag({ label }: { label: string }) {
  return (
    <span className="inline-block px-2 py-1 border border-foreground/15 font-mono text-[11px] tracking-wide text-muted-foreground">
      {label}
    </span>
  );
}

function StatBlock({ value, label }: Metric) {
  return (
    <div className="border-l-2 border-accent pl-4">
      <div style={serif} className="text-2xl font-bold text-foreground leading-none mb-1">
        {value}
      </div>
      <Mono className="text-muted-foreground">{label}</Mono>
    </div>
  );
}

function SectionHeader({ no, title, intro }: { no: string; title: string; intro: string }) {
  return (
    <>
      <div className="flex items-baseline gap-4 mb-3">
        <Mono className="text-accent text-lg">{no}.</Mono>
        <h2 style={serif} className="text-2xl font-bold">
          {title}
        </h2>
      </div>
      <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed mb-8">{intro}</p>
      <Rule className="mb-8" />
    </>
  );
}

function ExperienceCard({ role }: { role: ExperienceRole }) {
  return (
    <article className="bg-card border border-foreground/12">
      <div className="flex flex-col gap-1 px-6 sm:px-8 py-5 border-b border-foreground/12 sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <h3 style={serif} className="text-lg font-bold">
            {role.role}
          </h3>
          <p className="text-sm text-foreground/75">{role.org}</p>
        </div>
        <Mono className="text-muted-foreground shrink-0 sm:ml-4">
          {role.start} to {role.end}
        </Mono>
      </div>

      <div className="grid md:grid-cols-[1fr_1px_minmax(0,17rem)]">
        <div className="px-6 sm:px-8 py-6">
          {role.orgNote && (
            <p className="text-sm italic leading-relaxed text-muted-foreground mb-4">
              {role.orgNote}
            </p>
          )}
          <ul className="space-y-2.5">
            {role.bullets.map((b) => (
              <li key={b} className="flex gap-3 text-sm leading-relaxed text-foreground/75">
                <Mono className="text-accent shrink-0 mt-0.5">{"→"}</Mono>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden md:block bg-foreground/10" aria-hidden="true" />

        <div className="px-6 sm:px-8 py-6 border-t border-foreground/12 md:border-t-0 flex flex-col gap-6">
          {role.metrics && role.metrics.length > 0 && (
            <div>
              <Mono className="text-muted-foreground block mb-4">Impact</Mono>
              <div className="flex flex-col gap-4">
                {role.metrics.map((m) => (
                  <StatBlock key={m.label} value={m.value} label={m.label} />
                ))}
              </div>
            </div>
          )}
          <div>
            <Mono className="text-muted-foreground block mb-3">Stack</Mono>
            <ul className="flex flex-wrap gap-1.5" aria-label={`${role.role} stack`}>
              {role.stack.map((t) => (
                <li key={t}>
                  <StackTag label={t} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const { links } = project;
  return (
    <article className="bg-card border border-foreground/12">
      <div className="flex flex-col gap-1 px-6 sm:px-8 py-5 border-b border-foreground/12 sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <h3 style={serif} className="text-lg font-bold">
            {project.name}
          </h3>
          <p className="text-sm text-foreground/75">{project.context}</p>
        </div>
        <Mono className="text-muted-foreground shrink-0 sm:ml-4">{project.period}</Mono>
      </div>

      <div className="grid md:grid-cols-[1fr_1px_minmax(0,17rem)]">
        <div className="px-6 sm:px-8 py-6">
          <p className="text-sm leading-relaxed text-foreground/75 mb-4">{project.summary}</p>
          <ul className="space-y-2.5">
            {project.bullets.map((b) => (
              <li key={b} className="flex gap-3 text-sm leading-relaxed text-foreground/75">
                <Mono className="text-accent shrink-0 mt-0.5">{"→"}</Mono>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden md:block bg-foreground/10" aria-hidden="true" />

        <div className="px-6 sm:px-8 py-6 border-t border-foreground/12 md:border-t-0 flex flex-col gap-6">
          <div>
            <Mono className="text-muted-foreground block mb-4">Results</Mono>
            <div className="flex flex-col gap-4">
              {project.metrics.map((m) => (
                <StatBlock key={m.label} value={m.value} label={m.label} />
              ))}
            </div>
          </div>
          <div>
            <Mono className="text-muted-foreground block mb-3">Stack</Mono>
            <ul className="flex flex-wrap gap-1.5" aria-label={`${project.name} stack`}>
              {project.tech.map((t) => (
                <li key={t}>
                  <StackTag label={t} />
                </li>
              ))}
            </ul>
          </div>
          {(links.github || links.secondary) && (
            <>
              <Rule />
              <div className="flex flex-col gap-2">
                {links.github && (
                  <a
                    href={links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors group"
                  >
                    <Github className="size-3.5" aria-hidden="true" />
                    <span className="group-hover:underline underline-offset-2">
                      {links.githubLabel}
                    </span>
                  </a>
                )}
                {links.secondary && (
                  <a
                    href={links.secondary}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors group"
                  >
                    <FileText className="size-3.5" aria-hidden="true" />
                    <span className="group-hover:underline underline-offset-2">
                      {links.secondaryLabel}
                    </span>
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

export function SystemsJourney() {
  const observedSection = useActiveSection(SECTION_IDS);
  const [navOverride, setNavOverride] = useState<string | null>(null);
  const activeSection = navOverride ?? observedSection;
  const [sheetOpen, setSheetOpen] = useState(false);
  const sheetTriggerRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (navOverride && observedSection === navOverride) {
      setNavOverride(null);
    }
  }, [navOverride, observedSection]);

  const scrollTo = useCallback(
    (id: string) => {
      setNavOverride(id);
      scrollToSection(id, prefersReducedMotion ?? false);
    },
    [prefersReducedMotion],
  );

  const sidebarLinks = [
    contact.berkeleyProfile && { label: "UC Berkeley", href: contact.berkeleyProfile },
    contact.github && { label: "GitHub", href: contact.github },
    contact.linkedIn && { label: "LinkedIn", href: contact.linkedIn },
    {
      label: "Download CV",
      href: narrative.resumePath,
      download: narrative.resumeFilename,
      icon: <Download className="size-3" aria-hidden="true" />,
    },
  ].filter(Boolean) as {
    label: string;
    href: string;
    download?: string;
    icon?: React.ReactNode;
  }[];

  const heroNav = [
    { no: "I", name: "About", id: "about" },
    { no: "II", name: "Skills", id: "skills" },
    { no: "III", name: "Experience", id: "experience" },
  ];

  return (
    <div
      className="min-h-screen bg-background pb-[calc(52px+env(safe-area-inset-bottom))] md:pb-0"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <header className="sticky top-0 z-30 bg-background border-b border-foreground/15 flex items-center justify-between px-6 py-3">
        <button
          type="button"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" })
          }
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors min-h-[44px] touch-manipulation"
        >
          <span style={serif} className="font-bold">
            {profile.name}
          </span>
        </button>
        <Mono className="text-muted-foreground hidden md:block">{profile.title}</Mono>
      </header>

      <MobileSectionBar
        activeSection={activeSection}
        sections={SYSTEMS_SECTIONS}
        onOpenSheet={() => setSheetOpen(true)}
        sheetOpen={sheetOpen}
        triggerRef={sheetTriggerRef}
      />

      <MobileSectionSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        sections={SYSTEMS_SECTIONS}
        activeSection={activeSection}
        onSelect={scrollTo}
        triggerRef={sheetTriggerRef}
      />

      <div className="flex">
        <DesktopSectionSidebar
          sections={SYSTEMS_SECTIONS}
          activeSection={activeSection}
          onSelect={scrollTo}
          personName={profile.name}
          personTitle={profile.title}
          personSubtitle="Data & AI Systems"
          footerLinks={sidebarLinks}
        />

        <main className="flex-1 min-w-0">
          <section className="border-b border-foreground/12 px-5 sm:px-8 md:px-14 py-14 md:py-20">
            <div className="max-w-3xl">
              <Mono className="text-muted-foreground block mb-6 uppercase tracking-widest text-[10px]">
                {profile.tagline}
              </Mono>
              <h1 style={serif} className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                Systems thinking.
                <br />
                Full-stack execution.
              </h1>
              <p className="text-base text-foreground/80 leading-relaxed max-w-xl">
                {profile.summary}
              </p>
            </div>

            <div className="mt-12 inline-grid grid-cols-3 border border-foreground/12">
              {heroNav.map((d, i) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => scrollTo(d.id)}
                  className={`text-left px-5 py-4 hover:bg-foreground/5 transition-colors ${i < 2 ? "border-r border-foreground/12" : ""}`}
                >
                  <Mono className="text-accent block mb-1">{d.no}</Mono>
                  <Mono className="text-muted-foreground text-[11px] leading-snug block">
                    {d.name}
                  </Mono>
                </button>
              ))}
            </div>
          </section>

          <section id="about" className="scroll-mt-16 px-5 sm:px-8 md:px-14 py-14 border-b border-foreground/12">
            <SectionHeader
              no="I"
              title="About"
              intro="Who she is and how to reach her."
            />

            <div className="grid md:grid-cols-[2fr_1px_1fr] bg-card border border-foreground/12">
              <div className="px-6 sm:px-8 py-8">
                {profile.about.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="text-sm leading-relaxed text-foreground/80 mb-4 last:mb-0"
                  >
                    {paragraph}
                  </p>
                ))}

                <Rule className="my-6" />

                <Mono className="text-muted-foreground block mb-4 uppercase tracking-widest text-[10px]">
                  Education
                </Mono>
                <ul className="space-y-4">
                  {education.map((ed) => (
                    <li key={ed.school} className="flex gap-3">
                      <GraduationCap className="size-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground/85">{ed.school}</p>
                        <p className="text-sm text-foreground/70">{ed.degree}</p>
                        {ed.detail && <p className="text-sm text-muted-foreground">{ed.detail}</p>}
                        <Mono className="text-muted-foreground">{ed.date}</Mono>
                        {ed.courses.length > 0 && (
                          <div className="mt-2">
                            <Mono className="text-muted-foreground block mb-1.5 text-[10px] uppercase tracking-widest">
                              Coursework
                            </Mono>
                            <ul className="flex flex-wrap gap-1.5" aria-label={`${ed.school} coursework`}>
                              {ed.courses.map((course) => (
                                <li key={course}>
                                  <StackTag label={course} />
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="hidden md:block bg-foreground/10" aria-hidden="true" />

              <div className="px-6 sm:px-8 py-8 border-t border-foreground/12 md:border-t-0 flex flex-col gap-5">
                {contact.email && (
                  <div>
                    <Mono className="text-muted-foreground block mb-3 uppercase tracking-widest text-[10px]">
                      Contact
                    </Mono>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-sm text-foreground/80 hover:text-accent transition-colors block break-all"
                    >
                      {contact.email}
                    </a>
                  </div>
                )}

                <Rule />
                <div className="flex flex-col gap-2">
                  {contact.berkeleyProfile && (
                    <a
                      href={contact.berkeleyProfile}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      <ExternalLink className="size-3" aria-hidden="true" />
                      UC Berkeley Profile
                    </a>
                  )}
                  {contact.github && (
                    <a
                      href={contact.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      <Github className="size-3" aria-hidden="true" />
                      GitHub
                    </a>
                  )}
                  {contact.linkedIn && (
                    <a
                      href={contact.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      <ExternalLink className="size-3" aria-hidden="true" />
                      LinkedIn
                    </a>
                  )}
                </div>

                <Rule />
                <a
                  href={narrative.resumePath}
                  download={narrative.resumeFilename}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  <Download className="size-3.5" aria-hidden="true" />
                  Download CV
                </a>
              </div>
            </div>
          </section>

          <section
            id="skills"
            className="scroll-mt-16 px-5 sm:px-8 md:px-14 py-14 border-b border-foreground/12"
          >
            <SectionHeader
              no="II"
              title="Skills"
              intro="Production tools and disciplines, organized by stack layer."
            />
            <div className="columns-1 sm:columns-2 gap-4 [column-fill:_balance]">
              {skillGroups.map((group) => (
                <div
                  key={group.category}
                  className="mb-4 break-inside-avoid bg-card border border-foreground/12 px-6 py-5"
                >
                  <Mono className="text-accent block mb-4 uppercase tracking-widest text-[10px]">
                    {group.category}
                  </Mono>
                  <ul className="flex flex-wrap gap-1.5" aria-label={group.category}>
                    {group.items.map((item) => (
                      <li key={item}>
                        <StackTag label={item} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section
            id="experience"
            className="scroll-mt-16 px-5 sm:px-8 md:px-14 py-14 border-b border-foreground/12"
          >
            <SectionHeader
              no="III"
              title="Experience"
              intro="Five years of software engineering across backend systems, data infrastructure, and AI research."
            />
            <div className="space-y-8">
              {experience.map((role) => (
                <ExperienceCard key={role.id} role={role} />
              ))}
            </div>
          </section>

          <section
            id="projects"
            className="scroll-mt-16 px-5 sm:px-8 md:px-14 py-14"
          >
            <SectionHeader
              no="IV"
              title="Projects"
              intro="Academic and personal projects tackling hard technical questions, separate from the day job."
            />
            <div className="space-y-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
