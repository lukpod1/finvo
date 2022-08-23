/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_COGNITO_REGION: string
  readonly VITE_USER_POOL_ID: string
  readonly VITE_USER_POOL_CLIENT_ID: string
  readonly VITE_IDENTITY_POOL_ID: string
  readonly VITE_USERS_API_URL: string
  readonly VITE_ACCOUNTS_API_URL: string
  readonly VITE_TRANSACTIONS_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}