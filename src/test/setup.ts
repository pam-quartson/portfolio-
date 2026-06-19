import "@testing-library/jest-dom/vitest";

// jsdom has no IntersectionObserver; SystemsJourney's scroll-spy needs it.
class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds = [];
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

globalThis.IntersectionObserver =
  MockIntersectionObserver as unknown as typeof IntersectionObserver;

// jsdom has no scrollIntoView / smooth scrollTo.
Element.prototype.scrollIntoView = () => {};
globalThis.scrollTo = (() => {}) as typeof globalThis.scrollTo;
