/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string
  readonly VITE_GITHUB_USERNAME?: string
  readonly VITE_GITHUB_TOKEN?: string
  readonly VITE_LEETCODE_USERNAME?: string
  readonly VITE_LEETCODE_API_BASE?: string
  readonly VITE_CODECHEF_USERNAME?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
