import { useEffect, useRef, useCallback } from "react";
import type { NavSection } from "./sectionNav.types";

function Mono({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`font-mono text-xs tracking-wide ${className}`}>{children}</span>;
}

interface SectionNavItemProps {
  section: NavSection;
  isActive: boolean;
  onSelect: (id: string) => void;
  variant: "sidebar" | "sheet";
}

function SectionNavItem({ section, isActive, onSelect, variant }: SectionNavItemProps) {
  if (variant === "sheet") {
    return (
      <button
        type="button"
        data-section-id={section.id}
        onClick={() => onSelect(section.id)}
        aria-current={isActive ? "true" : undefined}
        className={`flex items-center gap-4 w-full text-left min-h-[44px] px-4 py-3 rounded-lg transition-colors touch-manipulation ${
          isActive
            ? "bg-foreground/8 text-foreground"
            : "text-muted-foreground active:bg-foreground/5"
        }`}
      >
        <span
          className={`w-2 h-2 rounded-full shrink-0 ${isActive ? "bg-accent" : "border border-foreground/30"}`}
          aria-hidden="true"
        />
        <Mono className={`text-sm ${isActive ? "text-foreground" : ""}`}>{section.label}</Mono>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onSelect(section.id)}
      aria-current={isActive ? "true" : undefined}
      className={`flex items-center gap-3 w-full text-left py-2 min-h-[44px] transition-colors group touch-manipulation ${
        isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground/80"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all ${
          isActive ? "bg-accent" : "border border-foreground/25 group-hover:border-foreground/50"
        }`}
        aria-hidden="true"
      />
      <Mono
        className={`text-[11px] tracking-wide leading-relaxed ${isActive ? "text-foreground" : ""}`}
      >
        {section.label}
      </Mono>
    </button>
  );
}

interface SectionNavListProps {
  sections: NavSection[];
  activeSection: string;
  onSelect: (id: string) => void;
  variant: "sidebar" | "sheet";
  ariaLabel: string;
}

export function SectionNavList({
  sections,
  activeSection,
  onSelect,
  variant,
  ariaLabel,
}: SectionNavListProps) {
  return (
    <nav className={variant === "sheet" ? "space-y-1" : "space-y-1"} aria-label={ariaLabel}>
      {variant === "sidebar" && (
        <Mono className="text-muted-foreground block mb-4 uppercase tracking-widest text-[10px]">
          Contents
        </Mono>
      )}
      {sections.map((s) => (
        <SectionNavItem
          key={s.id}
          section={s}
          isActive={activeSection === s.id}
          onSelect={onSelect}
          variant={variant}
        />
      ))}
    </nav>
  );
}

interface MobileSectionSheetProps {
  open: boolean;
  onClose: () => void;
  sections: NavSection[];
  activeSection: string;
  onSelect: (id: string) => void;
  triggerRef: React.Ref<HTMLButtonElement>;
}

export function MobileSectionSheet({
  open,
  onClose,
  sections,
  activeSection,
  onSelect,
  triggerRef,
}: MobileSectionSheetProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const handleSelect = useCallback(
    (id: string) => {
      onSelect(id);
      onClose();
    },
    [onSelect, onClose],
  );

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement;
    const triggerEl =
      triggerRef && typeof triggerRef === "object" && "current" in triggerRef
        ? triggerRef.current
        : null;
    const activeBtn = dialogRef.current?.querySelector<HTMLElement>(
      `[data-section-id="${activeSection}"]`,
    );
    (activeBtn ?? dialogRef.current?.querySelector("button"))?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
      (triggerEl ?? previousFocusRef.current)?.focus();
    };
  }, [open, onClose, activeSection, triggerRef]);

  if (!open) return null;

  return (
    <>
      <button
        type="button"
        aria-label="Close section navigation"
        className="md:hidden fixed inset-0 z-40 bg-foreground/40 backdrop-blur-[2px] touch-manipulation"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Section navigation"
        className="md:hidden fixed inset-x-0 bottom-0 z-50 bg-card border-t border-foreground/15 rounded-t-2xl shadow-[0_-8px_32px_rgba(0,0,0,0.12)] pb-[env(safe-area-inset-bottom)]"
        id="mobile-section-sheet"
      >
        <div className="flex justify-center pt-3 pb-1" aria-hidden="true">
          <div className="w-10 h-1 rounded-full bg-foreground/20" />
        </div>
        <div className="px-4 pb-4 max-h-[min(70vh,480px)] overflow-y-auto overscroll-contain">
          <SectionNavList
            sections={sections}
            activeSection={activeSection}
            onSelect={handleSelect}
            variant="sheet"
            ariaLabel="Portfolio sections"
          />
        </div>
      </div>
    </>
  );
}

interface MobileSectionBarProps {
  activeSection: string;
  sections: NavSection[];
  onOpenSheet: () => void;
  sheetOpen: boolean;
  triggerRef: React.Ref<HTMLButtonElement>;
}

export function MobileSectionBar({
  activeSection,
  sections,
  onOpenSheet,
  sheetOpen,
  triggerRef,
}: MobileSectionBarProps) {
  const active = sections.find((s) => s.id === activeSection);
  const displayLabel = active?.shortLabel ?? active?.label ?? "Sections";

  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-30 border-t border-foreground/15 bg-background/95 backdrop-blur-sm pb-[env(safe-area-inset-bottom)]"
      data-testid="mobile-section-bar"
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={sheetOpen}
        aria-haspopup="dialog"
        aria-controls="mobile-section-sheet"
        onClick={onOpenSheet}
        className="flex items-center justify-between w-full min-h-[52px] px-5 py-3 touch-manipulation active:bg-foreground/5"
      >
        <span className="flex items-center gap-2 min-w-0">
          <span className="w-2 h-2 rounded-full bg-accent shrink-0" aria-hidden="true" />
          <Mono className="text-sm text-foreground truncate">{displayLabel}</Mono>
        </span>
        <Mono className="text-muted-foreground shrink-0 ml-3">Sections</Mono>
      </button>
    </div>
  );
}

interface DesktopSectionSidebarProps {
  sections: NavSection[];
  activeSection: string;
  onSelect: (id: string) => void;
  personName: string;
  personTitle: string;
  personSubtitle: string;
  footerLinks: { label: string; href: string; download?: string; icon?: React.ReactNode }[];
}

function Rule({ className = "" }: { className?: string }) {
  return <div className={`border-t border-foreground/20 ${className}`} aria-hidden="true" />;
}

export function DesktopSectionSidebar({
  sections,
  activeSection,
  onSelect,
  personName,
  personTitle,
  personSubtitle,
  footerLinks,
}: DesktopSectionSidebarProps) {
  return (
    <aside
      className="hidden md:flex flex-col sticky top-[49px] h-[calc(100vh-49px)] w-56 shrink-0 border-r border-foreground/12 bg-background py-12 px-7 justify-between overflow-y-auto"
      aria-label="Table of contents"
    >
      <div>
        <div className="mb-10">
          <p
            style={{ fontFamily: "'Libre Baskerville', serif" }}
            className="text-base font-bold leading-snug mb-1"
          >
            {personName}
          </p>
          <Mono className="text-muted-foreground leading-relaxed block">
            {personTitle}
            <br />
            {personSubtitle}
          </Mono>
        </div>

        <Rule className="mb-8" />

        <SectionNavList
          sections={sections}
          activeSection={activeSection}
          onSelect={onSelect}
          variant="sidebar"
          ariaLabel="Sections"
        />
      </div>

      {footerLinks.length > 0 && (
        <div>
          <Rule className="mb-4" />
          {footerLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              {...(l.download
                ? { download: l.download }
                : { target: "_blank", rel: "noopener noreferrer" })}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors py-1.5 min-h-[44px]"
            >
              {l.icon}
              <Mono className="text-[11px] tracking-wide">{l.label}</Mono>
            </a>
          ))}
        </div>
      )}
    </aside>
  );
}
