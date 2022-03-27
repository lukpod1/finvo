/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly USER_POOL_ID: string
  readonly USER_POOL_CLIENT_ID: string
  readonly IDENTITY_POOL_ID: string
  readonly USERS_API_URL: string
  readonly ACCOUNTS_API_URL: string
  readonly TRANSACTIONS_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}