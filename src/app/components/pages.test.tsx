import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, it, expect } from "vitest";
import { SystemsJourney } from "@/app/components/SystemsJourney";

function renderWithRouter(ui: React.ReactElement, route = "/") {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
}

describe("SystemsJourney", () => {
  it("renders the four differentiated sections", () => {
    renderWithRouter(<SystemsJourney />);
    expect(screen.getByRole("heading", { name: /^Experience$/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^Projects$/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^Skills$/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /^About$/i })).toBeInTheDocument();
  });

  it("renders real experience and project entries", () => {
    renderWithRouter(<SystemsJourney />);
    expect(screen.getByRole("heading", { name: /Lead Data Engineer/i })).toBeInTheDocument();
    expect(screen.getByText(/Street Streams Limited/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Privacy Regulation GraphRAG System/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Satellite Disaster Image Classification/i }),
    ).toBeInTheDocument();
  });

  it("links to the UC Berkeley profile", () => {
    renderWithRouter(<SystemsJourney />);
    const links = screen.getAllByRole("link", { name: /UC Berkeley/i });
    expect(links.length).toBeGreaterThan(0);
    expect(links[0]).toHaveAttribute(
      "href",
      "https://www.ischool.berkeley.edu/people/pamela-quartson",
    );
  });

  it("wires resume download without placeholder href", () => {
    renderWithRouter(<SystemsJourney />);
    const cvLinks = screen.getAllByRole("link", { name: /Download CV/i });
    expect(cvLinks.length).toBeGreaterThan(0);
    for (const link of cvLinks) {
      expect(link).toHaveAttribute("href", "/resumes/generalist.pdf");
      expect(link.getAttribute("href")).not.toBe("#");
    }
  });

  it("does not contain placeholder email", () => {
    renderWithRouter(<SystemsJourney />);
    expect(screen.queryByText("pamela@example.com")).not.toBeInTheDocument();
  });
});
