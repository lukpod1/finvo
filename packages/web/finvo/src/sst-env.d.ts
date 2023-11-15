/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_SESSION_API_URL: string
  readonly VITE_ACCOUNTS_API_URL: string
  readonly VITE_TRANSACTIONS_API_URL: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}