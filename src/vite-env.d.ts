/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTACT_EMAIL?: string;
  readonly VITE_GITHUB_URL?: string;
  readonly VITE_LINKEDIN_URL?: string;
  readonly VITE_VROD_GITHUB_URL?: string;
  readonly VITE_VROD_LIVE_URL?: string;
  readonly VITE_VROD_DOCS_URL?: string;
  readonly VITE_STREAMS_GITHUB_URL?: string;
  readonly VITE_STREAMS_LIVE_URL?: string;
  readonly VITE_GRAPHRAG_GITHUB_URL?: string;
  readonly VITE_GRAPHRAG_PAPER_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
