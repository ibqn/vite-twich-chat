/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SOCKET_ENDPOINT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
