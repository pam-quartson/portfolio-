export interface NavSection {
  id: string;
  label: string;
  shortLabel?: string;
}

export const SYSTEMS_SECTIONS: NavSection[] = [
  { id: "about", label: "I. About", shortLabel: "About" },
  { id: "skills", label: "II. Skills", shortLabel: "Skills" },
  { id: "experience", label: "III. Experience", shortLabel: "Experience" },
  { id: "projects", label: "IV. Projects", shortLabel: "Projects" },
];

export interface SidebarLink {
  label: string;
  href: string;
  download?: string;
}
