import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { MobileSectionBar, MobileSectionSheet } from "@/app/components/systems/SectionNav";
import { SYSTEMS_SECTIONS } from "@/app/components/systems/sectionNav.types";
import { useRef, useState } from "react";

function MobileNavHarness({
  initialActive = "about",
  onSelect = vi.fn(),
}: {
  initialActive?: string;
  onSelect?: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(initialActive);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleSelect = (id: string) => {
    setActive(id);
    onSelect(id);
    setOpen(false);
  };

  return (
    <>
      <MobileSectionBar
        activeSection={active}
        sections={SYSTEMS_SECTIONS}
        onOpenSheet={() => setOpen(true)}
        sheetOpen={open}
        triggerRef={triggerRef}
      />
      <MobileSectionSheet
        open={open}
        onClose={() => setOpen(false)}
        sections={SYSTEMS_SECTIONS}
        activeSection={active}
        onSelect={handleSelect}
        triggerRef={triggerRef}
      />
    </>
  );
}

describe("MobileSectionNav behavior", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "IntersectionObserver",
      vi.fn(() => ({
        observe: vi.fn(),
        disconnect: vi.fn(),
        unobserve: vi.fn(),
      })),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    document.body.style.overflow = "";
  });

  it("shows active section short label in bottom bar", () => {
    render(<MobileNavHarness initialActive="projects" />);
    expect(screen.getByTestId("mobile-section-bar")).toHaveTextContent("Projects");
  });

  it("opens sheet and selects a section", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<MobileNavHarness onSelect={onSelect} />);

    await user.click(screen.getByRole("button", { name: /Sections/i }));
    expect(screen.getByRole("dialog", { name: "Section navigation" })).toBeVisible();

    await user.click(screen.getByRole("button", { name: /Skills/i }));
    expect(onSelect).toHaveBeenCalledWith("skills");
    expect(screen.queryByRole("dialog", { name: "Section navigation" })).not.toBeInTheDocument();
  });
});
